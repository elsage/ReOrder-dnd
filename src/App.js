import React, { Component } from 'react';
import update from 'react/lib/update';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import InsertDialog from './InsertDialog';
import ListItem from './ListItem';
import ListSubmissionButton from './ListSubmissionButton';
import PullDataButton from './PullDataButton';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MultiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';

injectTapEventPlugin()
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cards: [{}],
      isEmpty: true,
      displayInsert: false,
      startIndex: 0,
      cardText: ''
    }
  }

  //Card Index Only Matters when the insert is visible.
  rankDirectly = (cardIndex, cardText) => {
    this.setState(update(this.state, {
      displayInsert: { $set: !this.state.displayInsert },
      startIndex: {$set: cardIndex },
      cardText: {$set: cardText}
    }))
  }

  saveCards = (newCards) => {
    this.setState({
      cards: newCards,
      isEmpty: false
    })
  }

  reset = () => {
    this.setState({
      cards: [{}],
      isEmpty: true
    })
  }

  insertCard = (dragIndex, hoverIndex) => {
    const { cards } = this.state
    const dragCard = cards[dragIndex]
    
    this.setState(update(this.state, {
      cards: {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragCard]
        ]
      },
      displayInsert: { $set: !this.state.displayInsert }
    }))
  }

  // Repurpose to also be able to handle double clicks.
  moveCard = (dragIndex, hoverIndex) => {
    const { cards } = this.state
    const dragCard = cards[dragIndex]
    
    this.setState(update(this.state, {
      cards: {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragCard]
        ]
      }
    }))
  }

  render() {
    const { cards } = this.state
    return (
      this.state.isEmpty ? (
        <MultiThemeProvider>
          <PullDataButton saveCards={this.saveCards} />
        </MultiThemeProvider>
      ) : (
          <div className="lsDiv">
            <br />
            <MultiThemeProvider>
              <Paper style={{ padding: '20px', backgroundColor: '#00BCD4' }}>
                Instructions: Drag and drop list elements to change their order.
              </Paper>
            </MultiThemeProvider>
            <MultiThemeProvider>
              <InsertDialog 
                visible={this.state.displayInsert} 
                toggleVisible={this.rankDirectly} 
                cardCount={this.state.cards.length} 
                startIndex={this.state.startIndex}
                insertCard={this.insertCard}
                cardText={this.state.cardText}/>
            </MultiThemeProvider>
            <br />
            {cards.map((card, i) => (
              <ListItem key={card.id}
                index={i}
                id={card.id}
                text={card.instruction}
                moveCard={this.moveCard}
                rankDirectly={this.rankDirectly} />
            ))}
            <MultiThemeProvider>
              <ListSubmissionButton listRO={this.state.cards} exit={this.reset} />
            </MultiThemeProvider>
          </div>
        )
    )
  }
}

export default DragDropContext(HTML5Backend)(App)