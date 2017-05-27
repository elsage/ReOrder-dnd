import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import muiThemeable from 'material-ui/styles/muiThemeable';
import $ from 'jquery';

class PullDataButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      datasetName: ''
    }
  }

  updateInput = (event) => {
    this.setState({
      datasetName: event.target.value
    })
  }

  retrieveDataset = (event) => {
    event.preventDefault()
    $.ajax({
      url: `../${this.state.datasetName}.json`,
      success: (data) => {
        this.props.saveCards(data)
        console.log('Data retrieved successfully.')
      },
      error: (e) => {
        alert(`${this.state.datasetName} not found. Please try again.`)
      },
      dataType: 'json'
    })
  }

  render() {
    return (
      <Paper className='lsDiv'>
        <form onSubmit={this.retrieveDataset}>
          Enter Dataset Name <br />
          <TextField type='text'
            id={'dataset-input-textfield'}
            value={this.state.datasetName}
            placeholder={'Search'}
            onChange={this.updateInput} /> <br />
          <RaisedButton primary={true} type='submit'> Submit </RaisedButton>
        </form>
      </Paper>
    )
  }
}

PullDataButton.propTypes = {
  saveCards: PropTypes.func.isRequired
}

export default muiThemeable()(PullDataButton);