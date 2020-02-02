import React from 'react'
import { NewChatForm } from '../components/NewChatForm'
import MessageList from './MessageList'
import ChatList from './ChatList'
import CurrentChatSettings from './CurrentChatSettings'
import { AuthenticationForm } from '../components/AuthenticationForm'
import { RegistrationForm } from '../components/RegistrationForm'
import { SettingsPanel } from '../components/SettingsPanel'
import { connect } from 'react-redux'
import { sendNewMessage } from '../actions/messageListActions'
import { submitUserEmailAndPassword, submitNewUser, createNewChat, resetAuthenticationResult } from '../actions/chatSettingsActions'
import './App.sass'

class App extends React.Component {

  renderChatListNewChatForm() {
    if (this.props.currentUser._id) {
      return (
        <div>
          <NewChatForm
            onSubmitNewChat = { this.props.createNewChat }
            currentUserId = { this.props.currentUser._id }
          />
          <ChatList />
        </div>
      )
    }
  }

  renderMessageList() {
    if (!this.props.currentUser._id) return
    if (!this.props.currentChat._id) return

    return (
      <MessageList sendNewMessage = { this.props.sendNewMessage } />
    )
  }

  onSignOut = () => {
    this.props.resetAuthenticationResult()
  }

  renderMainContent() {
    if (this.props.isUserAuthenticated) {
      return (
        <div className = "mainPanel">
          <div className = "userChatsPanel">
            <SettingsPanel
              onSignOut = { this.onSignOut }
            />
            <div>
              <h1>Curret user: { this.props.currentUser.name }</h1>
              {this.renderChatListNewChatForm()}
            </div>
          </div>
          <div className = "currentChatPanel">
            <CurrentChatSettings />
            {this.renderMessageList()}
          </div>
        </div>
      )
    }

    return (
      <div className = "regAuthFormsPanel">
        <RegistrationForm
          onSubmit = { this.props.submitNewUser }
        />
        <AuthenticationForm
          onSubmit = { this.props.submitUserEmailAndPassword }
        />
      </div>
    )
  }

  render() {
    return (
      <div className = "appPanel">
        { this.renderMainContent() }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    currentChat: state.currentChat,
    wasMessageReceived: state.wasMessageReceived,
    isUserAuthenticated: state.isUserAuthenticated,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createNewChat: (chatName, usersIds) => dispatch(createNewChat(chatName, usersIds)),
    sendNewMessage: (message) => dispatch(sendNewMessage(message)),
    submitUserEmailAndPassword: (userEmail, userPassword) => dispatch(submitUserEmailAndPassword(userEmail, userPassword)),
    submitNewUser: (user) => dispatch(submitNewUser(user)),
    resetAuthenticationResult: () => dispatch(resetAuthenticationResult()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
