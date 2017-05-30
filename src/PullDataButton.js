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
      datasetName: '',
      errorText: '',
      hintText: 'Name'
    }
  }

  updateHint = () => {
    this.setState({
      hintText: ''
    })
  }

  updateInput = (event) => {
    if (this.state.errorText === '') {
      this.setState({ datasetName: event.target.value })
    } else {
      this.setState({
        datasetName: event.target.value,
        errorText: ''
      })
    }
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
        this.setState({
          errorText: 'Dataset not found. Please try again.'
        })
        
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
            onChange={this.updateInput} 
            inputStyle={{textAlign: 'center'}}
            onFocus={this.updateHint}
            hintText={this.state.hintText}
            hintStyle={{width: '225px', textAlign: 'center'}}
            style={{width: '225px'}}
            errorText={this.state.errorText}/> <br />
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