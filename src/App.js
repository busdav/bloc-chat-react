import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import Landing from './components/Landing';
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
  render() {

    return (
      <div className="App">
        <header>
          <nav>
            <Link to='/'>Landing</Link>
            <Link to='/roomlist'>Rooms</Link>
          </nav>
          <h1>Bloc Chat</h1>
        </header>
        
        <main>
          
          <Route exact path="/" component={Landing} />
          <Route
            path='/roomlist'
            render={(props) => <RoomList {...props} firebase={firebase} />}
          />
        </main>
      </div>
    );
  }
}

export default App;
