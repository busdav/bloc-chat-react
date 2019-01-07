import React, { Component } from 'react';

class MessageList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      messages: [],
    }

    this.messagesRef = this.props.firebase.database().ref('rooms');
    // this.handleChange = this.handleChange.bind(this);
  }

  // componentDidMount() {
  //   this.roomsRef.on('child_added', snapshot => {
  //     const room = snapshot.val();
  //     room.key = snapshot.key;
  //     this.setState({ rooms: this.state.rooms.concat( room ) });
  //   });
  // }

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

    return (
      <div className="message-list">
        Message List here. Should display all messages associated with activeRoom. 
      </div>
    );
  }
}

export default MessageList;

