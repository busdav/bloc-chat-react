import React, { Component } from 'react';

class MessageList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      allMessages: [],
      displayedMessages: [],
    }

    this.messagesRef = this.props.firebase.database().ref('messages');
  }
  
  componentDidMount() {
    this.messagesRef.on('child_added', snapshot  => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ allMessages: this.state.allMessages.concat( message ) }, () => {
        this.setDisplayedMessages( this.props.activeRoom )
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setDisplayedMessages( nextProps.activeRoom ); // note that we're setting the state by calling setDisplayedMessage
  }

  setDisplayedMessages(activeRoom) {
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

