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
      cards: [{}], 
      isEmpty: true,
      dataset: 'Instruction Set'
    }
  }

  retrieveDataset = (datasetName) => {
    $.ajax({
      url: `../${datasetName}.json`,
      success: (data) => {
        this.setState({
          cards: data,
          isEmpty: false
        })
        console.log('Data retrieved successfully.')
        console.log('First entry: ' + JSON.stringify(data[0]))
      },
      error: (e) => {
        alert(`${datasetName} not found. Please try again.`)
      },
      dataType: 'json'
    })
  }
  
  componentDidMount = () => {
    // this.retrieveDataset('data')
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

  updateInput = (event) => {
    this.setState({
      dataset: event.target.value
    })
  }

  render() {
    const { cards } = this.state

    return (
      this.state.isEmpty ? (
        <div className='lsDiv'>
           Enter Dataset Name <form onSubmit={() => { this.retrieveDataset(this.state.dataset) }}>
            <input value={this.state.dataset} onChange={this.updateInput}/>
          </form>
        </div>
      ) : (
          <div style={style}>
            {cards.map((card, i) => (
              <ListItem key={card.id}
                index={i}
                id={card.id}
                text={card.instruction}
                moveCard={this.moveCard} />
            ))}
          </div>
        )
    )
  }
}

export default DragDropContext(HTML5Backend)(App)