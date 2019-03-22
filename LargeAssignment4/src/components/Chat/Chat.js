import React from 'react';
import { socket } from '../../services/socketService';
import { connect } from 'react-redux';

class Chat extends React.Component {

  componentDidMount() {
    console.log("Inside Chat Mount!");

    //This shit expensive bro!
    //Complete rerender every time any update user shit happens
    //Might have to test what happens when two users are in a room and one leaves
    //socket.on("updateusers", (newRoom, roomUsers, roomOps) => {
    //  this.setState({ messages : [] });
    //});

    //Find out how to re render chat when a new room is created

    socket.on('updatechat', (roomName, messageHistory) => {
      this.setState({ messages: messageHistory });
    });

    this.setState({ currentRoom: this.props.room });
  }

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      message: "",
      currentRoom: this.props.room
    };
  }
  
  sendMessage(message) {
    if (message === '') { 
      return false; 
    }
    socket.emit('sendmsg', { roomName: this.props.room, msg: message });
    this.setState({ message: '' });
  }

  /**
   * Vill fá chatRoomName renderast á milli herbergja ég er heimskur
   * ÉG ekki skilja HELP
   */

  render() {
    const { messages, message } = this.state;
    console.log("inni render i chat.js")
    console.log(this.props.room);
    return (
      <div className="chat-window">
      <h3>Chat.IO - CURRENTROOM</h3>
        <div className="messages">
        { messages.map(m => <div key={ m.timestamp } className="message">{ m.message }</div>) }
        </div>
        <div className="input-container">
            <input type="text" value={ message } onChange={e => this.setState({ message: e.target.value })} placeholder="Enter your message here..." />
            <button type="button" onClick={() => this.sendMessage(message)}>Send</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ user, room }) => {
  return {
    user,
    room
  };
};

//Needs connections to: Users, Messages for current room, Current room name
export default connect(mapStateToProps)(Chat);