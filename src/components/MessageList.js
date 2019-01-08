import React, { Component } from 'react';

class MessageList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      messages: [],
    }

    this.messagesRef = this.props.firebase.database().ref('messages/' + this.props.activeRoom);
  
    // this.handleChange = this.handleChange.bind(this);
  }

  // componentDidMount() {
  //   this.messagesRef.on('value', snapshot => {
  //     const messageChanges = [];
  //     snapshot.forEach((message) => {
  //         messageChanges.push({
  //           key: message.key,
  //           username: message.val().username,
  //           content: message.val().content,
  //           sentAt: message.val().sentAt,
  //           updatedTime : message.val().updatedTime
  //         });
  //     });
  //     this.setState({ messages: messageChanges});
  //     this.latestMessage.scrollIntoView();
  //   });
  
  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      message.username = snapshot.username;
      message.content = snapshot.content;
      message.sentAt = snapshot.sentAt;
      this.setState({ messages: this.state.messages.concat( message ) });

    // this.messagesRef.on('value', snapshot => {
    //   const messageChanges = [];
    //   snapshot.forEach((message) => {
    //       messageChanges.push({
    //         key: message.key,
    //         username: message.val().username,
    //         content: message.val().content,
    //         sentAt: message.val().sentAt,
    //         updatedTime : message.val().updatedTime
    //       });
    //   });
    //   this.setState({ messages: messageChanges});
    //   // this.latestMessage.scrollIntoView();
    
    });
  }

  // handleChange(e) {
  //   // e.preventDefault();
  //   const newName = e.target.value;
  //   this.setState({ name: newName });
  //   // this.setState({
  //   //   [e.target.name]: e.target.value,
  //   //   creator: this.props.user
  //   // });
  // }


  render() {

    const messageList = (
      <section className="messages-list">
      {
        this.state.messages.map((message) =>
          <ul key={message.key}>
            <li className="message">
              {message.content}
            </li>
          </ul>
        )
      }
      </section>
    );  


    return (

      <div className="message-column">
          {messageList}
      </div>
    );
  }
}

export default MessageList;

