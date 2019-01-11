import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class RoomList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
      name: "",
    }

    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) });
      if (this.state.rooms.length === 1) { this.props.setActiveRoom(room) }
    });
  }

  handleNameChange(e) {
    e.preventDefault();
    const newName = e.target.value;
    this.setState({ name: newName });
  }

  validateRoomName(str) {
    const roomName = str || this.state.name;
    const roomLength = roomName.trim().length;
    if (roomLength > 1 ) { return true; }
    else { return false; }
  }

  createRoom(newRoomName) {
    if (this.validateRoomName(newRoomName)) {
      this.roomsRef.push({ name: this.state.name });
      this.setState({ name: "" });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.createRoom(this.state.name);
 }


  render() {

    const roomForm = (
      <form className="form-inline my-2 my-lg-0" onSubmit={(e) => this.handleSubmit(e)}>
        <div className="form-group">
          <input type="text" className="form-control mr-sm-2" name="name" value={this.state.name} placeholder="New Room" onChange={(e) => this.handleNameChange(e)} />
        </div>
        <button type="submit" className="btn btn-outline-primary my-2 my-sm-0">Create</button>
      </form>
    );

    return (
      <div className="room-column">
        <section className="create-room">
          {roomForm}
        </section>
        <section className="room-list">
          {
            this.state.rooms.map((room) =>
              <ul className="nav nav-pills pull-left"  key={room.key}>
                <li className="nav-item" onClick={() => this.props.setActiveRoom(room) }>
                  <Link to='#'>{room.name}</Link>
                </li>
              </ul>
            )
          }
        </section>
      </div>
    );
  }
}

export default RoomList;

