import React, { Component } from 'react';

class MessageInput extends Component {

  sendMessage() {
    const message = {
      id: this.props.chatId,
      text: this.refs.msgInput.value,
      sentAt: new Date().toLocaleTimeString()
    };
  
    // publish message into the chat channel
    const ttl = 5 * 60; // 5 minutes
    this.props.realtime.publish(this.props.chatChannel, JSON.stringify(message), ttl, (err, seqId) => {
      if(err) {
        console.log("Error publishing message:", err);
      } else {
        console.log("Message successfully published. SeqID:", seqId);
      }
    });
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
