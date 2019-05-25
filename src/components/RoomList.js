import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);

this.state = {
    rooms: []
  };

this.roomsRef = this.props.firebase.database().ref('rooms');

}

componentDidMount() {
     this.roomsRef.on('child_added', snapshot => {
       const room = snapshot.val();
       room.key = snapshot.key;
       this.setState({ rooms: this.state.rooms.concat( room ) });
       });
   }

createRoom = (event) => {
  this.roomsRef.push({
    name: this.input.value
  })
}


render() {
  return (
    <div className="RoomList">
       <ul>
         {
           this.state.rooms.map( (room, index) => {
             return (
               <li key={room.key}>{room.name}</li>
             )
           })
         }
       </ul>
         <input
            className="Input"
            type="text"
            ref={(input) => this.input=input}
            />
          <button
          className="AddButton"
          onClick={this.createRoom}>Add New Room</button>
    </div>
  )
 }
}


export default RoomList;
