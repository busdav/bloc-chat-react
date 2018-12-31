import React, { Component } from 'react';

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
    });
  }

  handleChange(e) {
    // e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
      // creator: this.props.user
    });
  }

  validateRoomName(str) {
    const roomName = str || this.state.name;
    const roomLength = roomName.trim().length;
    if (roomLength > 0 ) { return true; }
    else { return false; }
  }

  createRoom(e) {
    // e.preventDefault();
    if (this.validateRoomName()) {
      this.roomsRef.push({ name: this.state.name });
      this.setState({ name: "" });
    }
  }


  render() {

    const roomForm = (
      <form onSubmit={this.createRoom}>
        <div className="form-group">
          <label for="name">Room name</label>
          <input type="text" className="form-control" name="name" value={this.state.name} placeholder="New Room" onChange={this.handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Create</button>
      </form>
    );


    return (
      <section className="room-list">
        {
          this.state.rooms.map((room) =>
            <ul class="nav nav-pills pull-left">
              <li class="nav-item">
                <a class="nav-link" href="#" key={room.key}>{room.name}</a>
              </li>
            </ul>
          )
        }
      </section>
    );
  }
}

export default RoomList;

