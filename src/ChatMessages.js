import React, { Component } from 'react';

class ChatMessages extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      messages: this.props.messages ? this.props.messages : []
    }
  }

  // add a new message to the message list
  addMessage(message) {
    this.setState(prevState => {
      var newArray = prevState.messages.slice(0);
      newArray.push({
        key: prevState.messages.length,
        ...message
      });
      return {
        messages: newArray
      }
    });
  }

  render() {
    return (
      <div id="log">
      {
        this.state.messages.map((message) => {
          const msgAlign = (message.id === this.props.chatId ? "right" : "left");
          return (<div key={ message.key } className={ "blockquote-" + msgAlign }>
              { message.text }
              <br />
              <span className="time">{ message.sentAt }</span>
            </div>
          )
        }) 
      }
      </div>
    );
  }
}

export default ChatMessages;
