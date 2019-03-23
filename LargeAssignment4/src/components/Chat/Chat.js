import React from 'react';
import { socket } from '../../services/socketService';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


class Chat extends React.Component {

  componentDidMount() {
    socket.on('updatechat', (roomName, messageHistory) => {
      if(roomName == this.state.currentRoom) {
        this.setState({ messages: messageHistory });
      }
      else {
      }
      this.setState({ currentRoom: this.props.room });
    });

    this.setState({ currentRoom: this.props.room });

    socket.on("updateusers", (room, roomsUsers, roomsOps) => {
      this.setState({ currentRoom: room });
    });
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

Chat.propTypes = {
  user: PropTypes.string.isRequired,
  room: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired  
};

export default connect(mapStateToProps)(Chat);