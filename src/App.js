import React, { Component } from 'react';
import update from 'react/lib/update';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import ListItem from './ListItem';
import $ from 'jquery';

const style = {
  // width: 400
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cards: [{
        id: 0,
        text: 'Test Anti-Gravity Thrusters'
      }, {
        id: 1,
        text: 'Check Helmet for Cracks'
      }, {
        id: 2,
        text: 'Inspect Weather Patterns'
      }, {
        id: 3,
        text: 'Scan Horizon for Geese'
      }, { 
        id: 4,
        text: 'REMEMBER TO NOT PRESS THE RED BUTTON'
      }, {
        id: 5,
        text: 'Press the red button'
      }]
    }
  }

  onComponentMount() {
    /* Will use once have endpoint */ 
    // $.ajax({
    //   url: 'www.test.com',
    //   data: data,
    //   success: (data) => {
    //     console.log(JSON.stringify(data))
    //     this.setState({
    //       listArray: data
    //     })
    //   },
    //   dataType: 'json'
    // })
  }

  printState = () => {
    // console.log(this.state)
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