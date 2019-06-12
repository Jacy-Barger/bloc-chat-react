import React, { Component } from 'react';
import './App.css';
import RoomList from './components/RoomList'
import MessageList from './components/MessageList'
import * as firebase from 'firebase';

// Your web app's Firebase configuration
 var firebaseConfig = {
   apiKey: "AIzaSyCPI9oCmTR_0bj8UXcub2K1mu6Q9hXE6us",
   authDomain: "bloc-chat-react-5f2d5.firebaseapp.com",
   databaseURL: "https://bloc-chat-react-5f2d5.firebaseio.com",
   projectId: "bloc-chat-react-5f2d5",
   storageBucket: "bloc-chat-react-5f2d5.appspot.com",
   messagingSenderId: "905849312906",
   appId: "1:905849312906:web:993b0d2228ee8b66"
 };
 // Initialize Firebase
 firebase.initializeApp(firebaseConfig);

class App extends Component {
  constructor(props) {
    super(props);
  this.state = {
      currentRoomId: '',
  };
}

selectedRoom = (id) => {
  this.setState({
    currentRoomId: id,
  });
}

  render() {
  return (
    <div className="App">
      <header>
        <p className="Header">
          Bloc Chat
        </p>
      </header>
        <div className="List">
          <RoomList
           firebase={firebase}
           selectedRoom={this.selectedRoom}
         />
        </div>
        <div className="Message">
          <MessageList
            firebase={firebase}
            currentRoomId={this.state.currentRoomId}
          />
       </div>
    </div>
  );
 }
}

export default App;
