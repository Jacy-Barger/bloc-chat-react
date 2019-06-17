import React, { Component } from 'react';
import './../App.css';

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


  createMessage = (e) => {
    this.messagesRef.push({
      content: this.state.newMessageSubmission,
      roomID: this.props.currentRoomId,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      username: this.props.userName.displayName,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.state.newMessageSubmission) {return}
    this.setState({  newMessageSubmission: '' });
  }

  handleChange = (e) => {
    this.setState({ newMessageSubmission: e.target.value })
  }

  getRoomMessages() {
    return this.state.messages.filter((message) => {
      return message.roomID === this.props.currentRoomId;
   });
  }

  render() {
    return (
      <div>
         <ul className="messagecontent">
           {
             this.getRoomMessages().map( (message, index) => {
               return (
                 <li className="individualmessage"
                     key={message.key}>{message.content}</li>
               )
            })
            }
          </ul>
          <ul className="messagetimestamp">
            {
              this.getRoomMessages().map( (message, index) => {
                return (
                  <li className="individualmessage"
                      key={message.key}>{message.username} : {message.sentAt}
                  </li>
                )
             })
            }
          </ul>
      {
        this.props.currentRoomId &&
        <form className="sendmessageform"
              onSubmit={ (e) => this.handleSubmit(e) }>
           <input
              className="MessageInput"
              type="text"
              onChange={ (e) => this.handleChange(e) }
              value={ this.state.newMessageSubmission }
              ref={ (input) => this.input=input }
              placeholder="type your message..."
           />
           <button
              className="addmessagebutton"
              onClick={this.createMessage}>Send Message
           </button>
        </form>
       }
      </div>
  )
 }
}


export default MessageList;
