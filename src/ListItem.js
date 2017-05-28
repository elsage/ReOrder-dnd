import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import ItemTypes from './ItemTypes';
import flow from 'lodash/flow';
import Paper from 'material-ui/Paper';
import muiThemeable from 'material-ui/styles/muiThemeable';

const cardSourceSpec = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index
    }
  },
  endDrag(props) {
    return {
      id: props.id,
      index: props.index
    }
  }
}

const cardTargetSpec = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index
    const hoverIndex = props.index

    if (dragIndex === hoverIndex) {
      return
    }

    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
    const clientOffset = monitor.getClientOffset()
    const hoverClientY = clientOffset.y - hoverBoundingRect.top

    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return
    }

    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return
    }

    props.moveCard(dragIndex, hoverIndex)

    monitor.getItem().index = hoverIndex
  }
}

// These collect functions determine what is injected into components.
function collectTargetProps(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    highlight: monitor.canDrop()
  }
}

function collectSourceProps(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

class ListItem extends Component {
  render() {
    const { muiTheme, index, text, highlight, isDragging, connectDragSource, connectDropTarget } = this.props
    const opacity = isDragging ? 0.5 : 1
    const backgroundColor = isDragging ? 'yellow' : 'white'
    // console.log(muiTheme.paper.zDepthShadows)
    const zDepthShadows = muiTheme.paper.zDepthShadows
    return connectDragSource(connectDropTarget(
      <div className='itemList' style={{backgroundColor}}>
          {(index + 1) + " " + text}
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
  instruction: PropTypes.string.isRequired,
  moveCard: PropTypes.func.isRequired
}

export default flow(
  DragSource(ItemTypes.LISTITEM, cardSourceSpec, collectSourceProps),
  DropTarget(ItemTypes.LISTITEM, cardTargetSpec, collectTargetProps),
  muiThemeable(),
)(ListItem)