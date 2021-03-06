import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import Landing from './components/Landing';
import User from './components/User';
import { Route, Link } from 'react-router-dom';


// Initialize Firebase
var config = {
  apiKey: "AIzaSyCy0KAQzOEzy6vWw9aL9ZQkVJNkPW4L31M",
  authDomain: "bloc-chat-react-1b9df.firebaseapp.com",
  databaseURL: "https://bloc-chat-react-1b9df.firebaseio.com",
  projectId: "bloc-chat-react-1b9df",
  storageBucket: "bloc-chat-react-1b9df.appspot.com",
  messagingSenderId: "85511703523"
};
firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeRoom: null,
      activeUser: null,
    }
  }

  setActiveRoom(room) {
    this.setState({ activeRoom: room });
  }

  setActiveUser(user) {
    this.setState({ activeUser: user });
  }

  render() {

    return (
      <div className="App">
        <header>
        
          {/* <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">Navbar</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
          
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                  <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Link</a>
                </li>
                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Dropdown
                  </a>
                  <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a class="dropdown-item" href="#">Action</a>
                    <a class="dropdown-item" href="#">Another action</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#">Something else here</a>
                  </div>
                </li>
                <li class="nav-item">
                  <a class="nav-link disabled" href="#">Disabled</a>
                </li>
              </ul>
              <form class="form-inline my-2 my-lg-0">
                <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
              </form>
            </div>
          </nav> */}

          <nav>
            <Link to='/'>Landing</Link>
            <Link to='/roomlist'>Rooms</Link>
          </nav>
          <h1>Bloc Chat</h1>
        </header>
        
        <main>
          
          <Route exact path="/" component={Landing} />
          <Route 
            path="/"
            render={(props) => <User {...props} 
              firebase={firebase} 
              activeUser={this.state.activeUser}
              setActiveUser={(user) => this.setActiveUser(user)}
            />}
          />
          <Route
            path='/roomlist'
            render={(props) => <RoomList {...props} 
              firebase={firebase} 
              activeRoom={this.state.activeRoom}
              setActiveRoom={(room) => this.setActiveRoom(room)} 
            />}
          />
          <Route
            path='/roomlist'
            render={(props) => <MessageList {...props} 
              firebase={firebase} 
              activeRoom={this.state.activeRoom}
              activeUser={this.state.activeUser}
            />}
          />
        </main>
      </div>
    );
  }
}

export default App;
