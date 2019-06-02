import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);

this.state = {
    messages: [],
    newMessageSubmission: ''
  };

  this.messagesRef = this.props.firebase.database().ref('messages');

  }

  componentDidMount() {
       this.messagesRef.on('child_added', snapshot => {
         const message = snapshot.val();
         message.key = snapshot.key;
         this.setState({ messages: this.state.messages.concat( message ) });
         });
     }


 createMessage = (event) => {
   this.messagesRef.push({
     name: this.input.value
   });
 }

 handleSubmit = (event) => {
   event.preventDefault();
   if (!this.state.newMessageSubmission) {return}
   this.setState({  newMessageSubmission: '' });
 }

 handleChange = (event) => {
   this.setState({ newMessageSubmission: event.target.value })
 }

 getRoomMessages() {
   return this.state.messages.filter((message) => {
     return message.roomID === this.props.roomID
   });
 }

  render() {
    return (
      <div>
          <ul>
            {
              this.getRoomMessages().map( (message, index) => {
                return (
                  <li key={message.key}>{message.content}</li>
                )
              })
            }
          </ul>
          <form onSubmit={ (event) => this.handleSubmit(event) }>
             <input
                 className="Input"
                 type="text"
                 onChange={(event) => this.handleChange(event)}
                 value={ this.state.newMessageSubmission }
                 ref={(input) => this.input=input}/>
             <button
                 className="AddButton"
                 onClick={this.createMessage}>Send Message</button>
           </form>
      </div>
  )
 }
}


export default MessageList;
