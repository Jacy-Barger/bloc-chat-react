import React, { Component } from 'react';
import './App.css';
import RoomList from './components/RoomList'
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
           firebase={firebase} />
        </div>
    </div>
  );
 }
}

export default App;
