import React, { Component } from 'react';
import './../App.css';

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
      newRoomSubmission: ''
    };

    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;

      this.setState({
        rooms: this.state.rooms.concat( room )
      });

      if(this.state.rooms.length === 1) {
        this.props.selectedRoom(this.state.rooms[0].key)
      }
    });
  }

  createRoom = (e) => {
    this.roomsRef.push({
      name: this.input.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.state.newRoomSubmission) {return}
    this.setState({  newRoomSubmission: '' });
  }

  handleChange = (e) => {
    this.setState({ newRoomSubmission: e.target.value })
  }

  render() {
    return (
      <div className="RoomList">
         <ul className="rooms">
           {
             this.state.rooms.map((room, index) => {
               return (
                 <li
                  className="individualroom"
                  onClick={() => this.props.selectedRoom(room.key)}
                  key={room.key}
                 >{room.name}</li>
               )
             })
           }
         </ul>
         <form
            className="addroomform"
            onSubmit={ (e) => this.handleSubmit(e) }>
            <input
              className="Input"
              type="text"
              onChange={ (e) => this.handleChange(e) }
              value={ this.state.newRoomSubmission }
              ref={(input) => this.input=input}
              placeholder="add your own room..."
            />
            <button
              className="addroombutton"
              onClick={this.createRoom}
            >Add New Room</button>
          </form>
      </div>
    )
   }
}


export default RoomList;
