import React, { Component } from 'react';

class RoomList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      rooms: []
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

  render() {
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

