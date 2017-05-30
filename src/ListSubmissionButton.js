import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
// import $ from 'jquery';

class ListSubmissionButton extends Component {
  state = {
    dialogIsOpen: false
  }

  exitProgram = () => {
    this.setState({
      dialogIsOpen: false
    }, this.props.exit())
  }

  closeDialog = () => {
    this.setState({
      dialogIsOpen: false
    })
  }

  submitList = () => {
    //     $.ajax({
    //         type: 'POST', 
    //         url: '',
    //         data: this.props.listRO,
    //         success: (obj) => {
    //             this.setState({dialogIsOpen: true})
    //         },
    //         dataType: 'json'
    //     })
    this.setState({
      dialogIsOpen: true
    })
  }

  render() {
    const dialogActions = [
    <RaisedButton primary={true} label='Exit' onClick={this.exitProgram}/>,
    <RaisedButton secondary={true} label='More Changes' onClick={this.closeDialog}/>
    ]
    return (
      <div>
        <br />
        <RaisedButton secondary={true} onClick={this.submitList}>Submit Changes</RaisedButton>
        <Dialog
          title='Data Submitted'
          actions={dialogActions}
          modal={false}
          open={this.state.dialogIsOpen}
          onRequestClose={this.closeDialog}>
          The (re)ordered data has been submitted. You may either exit or continue to make changes.
          If you decide to stay, please submit upon reordering.
        </Dialog>
      </div>
    )
  }
}

ListSubmissionButton.propTypes = {
  listRO: PropTypes.array.isRequired,
  exit: PropTypes.func.isRequired
}

export default ListSubmissionButton;