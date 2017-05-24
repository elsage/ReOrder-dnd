import React, { Component } from 'react';
import update from 'react/lib/update';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import ListItem from './ListItem';

const style = {
  width: 400
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cards: [{
        id: 0,
        text: 'Write a cool JS library'
      }, {
        id: 1,
        text: 'Make it generic enough'
      }]
    }
  }

  printState = () => {
    console.log(this.state)
  }

  moveCard = (dragIndex, hoverIndex) => {
    const { cards } = this.state
    const dragCard = cards[dragIndex]
    
    this.setState(update(this.state, {
      cards: {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragCard]
        ],
      }
    }))
  }

  render() {
    const { cards } = this.state

    return (
      <div style={style}>
        {cards.map((card, i) => (
          <ListItem key={card.id} 
                    index={i} 
                    id={card.id} 
                    text={card.text} 
                    moveCard={this.moveCard}
                    printState={this.printState}/>
        ))}
      </div>
    )
  }
} 

export default DragDropContext(HTML5Backend)(App)