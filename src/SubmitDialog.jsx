import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { lightBaseTheme } from 'material-ui/styles'
/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
export default class SubmitDialog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {
        question: 'Second favourite programming language?',
        choices: ['Swift', 'Python', 'Objective-C', 'Ruby']
      }
    }
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.props.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={() => this.props.handleSubmit(this.state.data)}
      />
    ]

    console.log('here')

    return (
      <Dialog
        title="Dialog With Actions"
        actions={actions}
        modal={false}
        open={this.props.open}
        onRequestClose={() => this.props.handleSubmit(this.state.data)}
      >
        Data: {JSON.stringify(this.state.data)}
      </Dialog>
    )
  }
}
