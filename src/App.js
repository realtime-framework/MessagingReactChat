import React, { Component } from 'react';
import * as Realtime from 'realtime-messaging';
import MessageInput from './MessageInput.js';
import ChatMessages from './ChatMessages.js';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    // the chat Realtime pub/sub channel
    this.channel = "chat";

    // the user random ID to use as nickname and subscriberId
    this.ID = "ID_" + Math.floor((Math.random() * 1000) + 1);
  }

  componentWillMount() {
    // Instantiate a Realtime client
    this.realtime = Realtime.createClient();    
    
    this.realtime.onConnected = (client) => {
      console.log("realtime connected");
      
      // subscribe the chat channel to receive messages
      client.subscribeWithBuffer(this.channel, this.ID, (client, channel, seqId, message) => {
        // add the received message to the chat messages component
        console.log("Received message with seqId:", seqId);
        this.refs.chatMessages.addMessage(JSON.parse(message));
      });
    }

    this.realtime.onException = (client, exception) => {
      console.log("Realtime Exception:", exception);
    }

    this.realtime.setClusterUrl("http://ortc-developers.realtime.co/server/2.1/");
    this.realtime.connect('ENTER-HERE-YOUR-REALTIME-APPKEY', 'token');
  }

  componentWillUnmount() {
    if(this.realtime) {
      // disconnect from Realtime
      this.realtime.disconnect();
    }
  }

  render() {
    return (
      <div>
        <MessageInput realtime={ this.realtime } chatChannel={ this.channel } chatId={ this.ID } />
        <ChatMessages ref="chatMessages" realtime={ this.realtime } chatId={ this.ID }  />
      </div>
    );
  }
}

export default App;
