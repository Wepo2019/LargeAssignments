import React from 'react';
import { socket } from '../../services/socketService';
import { connect } from 'react-redux';

class Chat extends React.Component {

  componentDidMount() {
    console.log("This shit: " + this.props.room);

    //This shit expensive bro!
    //Complete rerender every time any update user shit happens
    //Might have to test what happens when two users are in a room and one leaves
    //socket.on("updateusers", (newRoom, roomUsers, roomOps) => {
    //  this.setState({ messages : [] });
    //});

    //Find out how to re render chat when a new room is created

    socket.on('updatechat', (roomName, messageHistory) => {
      console.log(roomName + "  " + this.state.currentRoom);
      if(roomName == this.state.currentRoom) {
        console.log("this is the room i am in, im going to render new messages!");
        this.setState({ messages: messageHistory });
      }
      else {
        console.log("this is not the room i am in!")
      }
      this.setState({ currentRoom: this.props.room });
    });

    //To do: how to get second socket persons room list to update

    socket.on("updateusers", (room, roomsUsers, roomsOps) => {
      this.setState({ currentRoom: this.props.room });

      /*
      socket.on('updatechat', (roomName, messageHistory) => {
        this.setState({ messages: messageHistory });
        this.setState({ currentRoom: this.props.room });
      });
      */
    });

    this.setState({ currentRoom: this.props.room });
  }

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      message: "",
      allRooms: {},
      currentRoom: this.props.room
    };
  }
  
  sendMessage(message) {
    if (message === '') { 
      return false; 
    }
    socket.emit('sendmsg', { roomName: this.props.room, msg: message });
    this.setState({ message: '' , currentRoom: this.props.room});
  }
  
  /* TODO
   * 
   * Rendera Userlist til að senda primsg
   * Senda priMsg
   */

  render() {
    const { messages, message } = this.state;
    return (
      <div>
      <div className="chat-window">
      <h3>Chat.IO </h3>
            <div className="messages">
                { messages.map(m => (<div key={ m.timestamp } className="message">{new Date(m.timestamp).toLocaleTimeString()} - { m.nick }:   { m.message }</div>)) }
            </div>
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