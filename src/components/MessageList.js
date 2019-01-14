import React, { Component } from 'react';
import Moment from 'moment';

class MessageList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      allMessages: [],
      displayedMessages: [],
      content: "",
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
    this.messagesRef.on('child_removed', snapshot  => {
      this.setState({ allMessages: this.state.allMessages.filter( message => message.key !== snapshot.key )  }, () => {
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

  handleContentChange(e) {
    e.preventDefault();
    const newContent = e.target.value;
    this.setState({ content: newContent });
  }

  validateContent(str) {
    const content = str || this.state.content;
    const contentLength = content.trim().length;
    if (contentLength > 1 ) { return true; }
    else { return false; }
  }

  createMessage(content) {
    if (this.validateContent(content)) {
      this.messagesRef.push({ 
        content: this.state.content,
        sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
        username: this.props.activeUser ? this.props.activeUser.displayName : 'Guest',
        roomId: this.props.activeRoom.key,
      });
      this.setState({ content: "" });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.createMessage(this.state.content);
 }

 removeMessage(message) {
  this.messagesRef.child(message.key).remove();
}

  render() {

    const messageForm = (
      <form className="form-inline my-2 my-lg-0" onSubmit={(e) => this.handleSubmit(e)}>
        <div className="form-group">
          <input type="text" className="form-control mr-sm-2" name="name" value={this.state.content} placeholder="New Message" onChange={(e) => this.handleContentChange(e)} />
        </div>
        <button type="submit" className="btn btn-outline-primary my-2 my-sm-0">Send</button>
      </form>
    );

    return (
      <main id="messages-component">
        <h2 className="room-name">{ this.props.activeRoom ? this.props.activeRoom.name : '' }</h2>
        <ul id="message-list">
          {this.state.displayedMessages.map( message => 
            <li key={message.key}>
              <div className="username">
                 { message.username }
              </div>
              <div className="sentAt">
                { Moment(message.sentAt).format('MMMM Do YYYY, h:mm:ss a') }
              </div>
              <div className="content">
                 { message.content }
              </div>
              <div className="button-delete-message">
                <button type="button" className="btn btn-danger" onClick={() => this.removeMessage(message)}>Delete message</button>
              </div>
            </li>
          )}
        </ul>
        <div className="message-form">
          {messageForm}
        </div>
      </main>
    );
  }
}

export default MessageList;

