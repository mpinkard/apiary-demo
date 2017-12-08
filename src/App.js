import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import logo from './logo.svg'
import './App.css'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { lightBaseTheme } from 'material-ui/styles'
import SubmitDialog from './SubmitDialog'

require('whatwg-fetch')

const style = {
  margin: 12
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { questions: [], showSubmitDialog: false }
    this.submitDialogSubmit = this.submitDialogSubmit.bind(this)
  }

  listQuestion(question) {
    return (
      <div>
        <h3>{question.question}</h3>
        <ol>
          {question.choices.map((choice, i) => (
            <li key={i}>
              {choice.choice}, Votes: {choice.votes}{' '}
              {/*choice.userBase ? ', Users: '.concat(choice.userBase) : null*/}
            </li>
          ))}
        </ol>
      </div>
    )
  }

  loadQuiz() {
    fetch(`http://private-7bae7-demo679.apiary-mock.com/questions`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json(), err => console.log(err.message))
      .then(
        data => this.setState({ questions: data }),
        err => console.log(err.message)
      )
  }

  submitDialogOpen = () => {
    this.setState({ showSubmitDialog: true })
  }

  submitDialogSubmit(data) {
    this.setState({ showSubmitDialog: false })
    fetch(`http://private-7bae7-demo679.apiary-mock.com/questions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json(), err => console.log(err.message))
      .then(
        data => this.setState({ questions: [...this.state.questions, data] }),
        err => console.log(err.message)
      )
  }

  submitDialogClose = () => {
    this.setState({ showSubmitDialog: false })
  }

  render() {
    const questionsList = (
      <div>{this.state.questions.map(this.listQuestion)}</div>
    )
    const submitDialog = this.state.showSubmitDialog ? (
      <SubmitDialog
        open={this.state.showSubmitDialog}
        handleClose={this.submitDialogClose}
        handleSubmit={this.submitDialogSubmit}
      />
    ) : null

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Apiary Demo</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
          <RaisedButton
            label="Load Quiz"
            onClick={() => this.loadQuiz()}
            style={style}
            primary
          />
          <RaisedButton
            label="Clear Quiz"
            onClick={() => this.setState({ questions: [] })}
            style={style}
          />
          <RaisedButton
            label="Add Question"
            onClick={() => this.submitDialogOpen()}
            style={style}
            primary
          />
          {submitDialog}
        </MuiThemeProvider>
        <h2>Quiz</h2>
        {questionsList}
      </div>
    )
  }
}

export default App
