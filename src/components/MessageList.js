import React, { Component } from 'react';

class MessageList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      allMessages: [],
      displayedMessages: [],
      newMessageText: ''
    }

    this.messagesRef = this.props.firebase.database().ref('messages');
  }
  
  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      message.username = snapshot.username;
      message.content = snapshot.content;
      message.sentAt = snapshot.sentAt;
      this.setState({ allMessages: this.state.allMessages.concat( message ) }, () => {
        this.showMessages( this.props.activeRoom )
      });
    });
  }

  showMessages(activeRoom) {
    this.setState({ displayedMessages: this.state.allMessages.filter( message => message.roomId === activeRoom.key ) });
  }

  render() {

    return (
      <main id="messages-component">
        <h2 className="room-name">{ this.props.activeRoom ? this.props.activeRoom.name : '' }</h2>
        <ul id="message-list">
          {this.state.displayedMessages.map( message => 
            <li key={message.key}>
              <div className="username">
                 { message.username }
              </div>
              <div className="content">
                 { message.content }
              </div>
            </li>
          )}
        </ul>
      </main>
    );
  }
}

export default MessageList;

