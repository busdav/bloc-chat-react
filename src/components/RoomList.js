import React, { Component } from 'react';

class RoomList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
      name: "",
    }

    this.roomsRef = this.props.firebase.database().ref('rooms');
    this.handleChange = this.handleChange.bind(this);
    this.createRoom = this.createRoom.bind(this);
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
    const newName = e.target.value;
    this.setState({ name: newName });
    // this.setState({
    //   [e.target.name]: e.target.value,
    //   creator: this.props.user
    // });
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
      <form className="form-inline my-2 my-lg-0" onSubmit={this.createRoom}>
        <div className="form-group">
          <input type="text" className="form-control mr-sm-2" name="name" value={this.state.name} placeholder="New Room" onChange={this.handleChange} />
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
              <ul className="nav nav-pills pull-left">
                <li className="nav-item">
                  <a className="nav-link" href="#" key={room.key}>{room.name}</a>
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

