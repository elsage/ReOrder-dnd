import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

class InsertDialog extends Component {
  state = {
    selectedValue: null
  }

  handleChange = (event, index, value) => {
    this.setState({
      selectedValue: value
    })
  }

  render() {
    const { visible, cardText, startIndex, cardCount, toggleVisible, insertCard } = this.props
    const fieldItems = []
    for(var i = 0; i < cardCount; i++) {
      fieldItems.push(<MenuItem value={i} key={i} primaryText={`Rank ${i+1}`}/>)
    }

    const dialogActions = [
      <SelectField
        floatingLabelText='New Rank'
        floatingLabelFixed={true}
        value={this.state.selectedValue}
        onChange={this.handleChange}
        style={{width: '150px'}}
        maxHeight={300}>
        {fieldItems}
      </SelectField>,
      <RaisedButton 
        primary={true} 
        label='Submit' 
        onClick={()=> { 
          insertCard(startIndex, this.state.selectedValue)
        }} />
    ]

    return (
      visible ? (
        <Dialog
          title={`Current Rank: ${startIndex+1}`}
          actions={dialogActions}
          modal={false}
          open={visible}
          onRequestClose={toggleVisible}>
          {cardText}
        </Dialog>
      ) : (
        <div/>
      )
    )
  }
}

export default InsertDialog;