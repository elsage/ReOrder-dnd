import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class InsertDialog extends Component {
  state = {
    selectedValue: 0,
    visible: this.props.visible
  }

  handleChange = (event, index, value) => {
    this.setState({
      selectedValue: value
    })
  }

  render() {
    const { visible, cardCount, toggleVisible } = this.props
    const fieldItems = []
    for(var i = 0; i < cardCount; i++) {
      fieldItems.push(<MenuItem value={i} key={i} primaryText={`Rank ${i+1}`}/>)
    }
    const dialogActions = [
      <SelectField
        value={this.state.selectedValue}
        onChange={this.handleChange}
        maxHeight={300}>
      </SelectField>
    ]
    return (
      visible ? (
        /*<Dialog
          title='Choose Rank'
          actions={dialogActions}
          modal={false}
          open={visible}
          onRequestClose={toggleVisible}>
          Please select the rank you wish the item to occupy.
        </Dialog>*/
      ) : (
        <div/>
      )
    )
  }
}

export default InsertDialog;