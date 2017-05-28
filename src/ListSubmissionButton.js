import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
// import $ from 'jquery';

class ListSubmissionButton extends Component {

    submitList = () => {
        alert("Data submitted!")
        //     $.ajax({
        //         type: 'POST', 
        //         url: '',
        //         data: this.props.listRO,
        //         success: (obj) => {
        //             console.log(obj.status)
        //         },
        //         dataType: 'json'
        //     })
    }

    render() {
        return (
            <div>
                <br />
                <RaisedButton secondary={true} onClick={this.submitList}>Submit Changes</RaisedButton>
            </div>
        )
    }
}

ListSubmissionButton.propTypes = {
    listRO: PropTypes.array.isRequired
}

export default ListSubmissionButton;