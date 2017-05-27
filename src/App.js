import React, { Component } from 'react';
import update from 'react/lib/update';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import ListItem from './ListItem';
import $ from 'jquery';
import ListSubmissionButton from './ListSubmissionButton';

const style = {
  // width: 400
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cards: [{}], 
      isEmpty: true,
      dataset: ''
    }
  }

  retrieveDataset = (event) => {
    event.preventDefault() // This is to prevent re-loading of the page onSubmit()
    $.ajax({
      url: `../${this.state.dataset}.json`,
      success: (data) => {
        this.setState({
          cards: data,
          isEmpty: false
        })
        console.log('Data retrieved successfully.')
        console.log('First entry: ' + JSON.stringify(data[0]))
      },
      error: (e) => {
        alert(`${this.state.dataset} not found. Please try again.`)
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
    let empty = this.state.isEmpty
    console.log(empty)
    return (
      empty ? (
        <div className='lsDiv'>
          <form onSubmit={this.retrieveDataset}>
            Enter Dataset Name <input type='text' ref='datasetName' value={this.state.dataset} placeholder={'Search'} onChange={this.updateInput}/> 
            <button type='submit'> Submit </button>
          </form>
        </div>
      ) : (
          <div className="lsDiv" style={style}>
            {cards.map((card, i) => (
              <ListItem key={card.id}
                index={i}
                id={card.id}
                text={card.instruction}
                moveCard={this.moveCard} />
            ))}
            <ListSubmissionButton/>
          </div>
        )
    )
  }
}

export default DragDropContext(HTML5Backend)(App)