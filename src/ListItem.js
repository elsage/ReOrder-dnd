import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import ItemTypes from './ItemTypes';
import flow from 'lodash/flow';

const cardSource = {
    beginDrag(props) {
        return {
            id: props.id,
            index: props.index
        }
    },
    endDrag(props) {
        console.log(props)
        return {
            id: props.id,
            index: props.index
        }
    }
}

const cardTarget = {
    hover(props, monitor, component) {
        const dragIndex = monitor.getItem().index
        const hoverIndex = props.index

        if(dragIndex === hoverIndex) {
            return
        }

        const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
        const clientOffset = monitor.getClientOffset()
        const hoverClientY = clientOffset.y - hoverBoundingRect.top

        if(dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return
        }

        if(dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return
        }

        props.moveCard(dragIndex, hoverIndex)

        monitor.getItem().index = hoverIndex
    }
}

function collectSource(connect) {
    return {
        connectDropTarget: connect.dropTarget()
    }
}

function collectTarget(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

class ListItem extends Component {

    render() {
        const { text, isDragging, connectDragSource, connectDropTarget } = this.props
        const opacity = isDragging ? 0.5 : 1
        const backgroundColor = isDragging ? 'yellow' : 'white'

        return connectDragSource(connectDropTarget(
            <div className="lsDiv" style={{ opacity, backgroundColor }}>
                {text}
            </div>
        ))
    }
}

ListItem.propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.any.isRequired,
    text: PropTypes.string.isRequired,
    moveCard: PropTypes.func.isRequired
}

export default flow(
    DragSource(ItemTypes.LISTITEM, cardSource, collectTarget),
    DropTarget(ItemTypes.LISTITEM, cardTarget, collectSource)
)(ListItem)