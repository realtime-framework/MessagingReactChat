import React, { Component } from 'react';

class MessageInput extends Component {

  sendMessage() {
    const message = {
      id: this.props.chatId,
      text: this.refs.msgInput.value,
      sentAt: new Date().toLocaleTimeString()
    };
  
    // send message to the chat channel
    this.props.realtime.send(this.props.chatChannel, JSON.stringify(message));
    this.refs.msgInput.value = "";
  }

  onEnter(e) {
    if (e.nativeEvent.keyCode !== 13) return
    e.preventDefault()
    this.sendMessage()
  }

  render() {
    return (
      <div>
        <input ref="msgInput" type="text" className="materialize-input msgInput" placeholder="Enter your message" onKeyPress={ this.onEnter.bind(this) } />
        <button className="btn waves-effect waves-light" type="submit" name="action" onClick={ this.sendMessage.bind(this) } >
          Send Message
        </button>
      </div>
    );
  }
}

export default MessageInput;
