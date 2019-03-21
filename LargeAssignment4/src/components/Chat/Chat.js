import React from 'react';
import { socket } from '../../services/socketService';

class Chat extends React.Component {
  componentDidMount() {

  }

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      message: ""
    };
  }
  /*
  sendMessage(message) {
    if (message === '') { 
      return false; 
    }
    socket.emit('sendmsg', { roomName: this.props.currentRoom, msg: message });
    this.setState({ message: '' });
  }
  */
  render() {
    return ( <div></div> )
    /*
    return (
      <div className="chat-window">
        <div className="messages"></div>
        <div className="input-container">
            <input type="text" value={ message } onChange={e => this.setState({ message: e.target.value })} placeholder="Enter your message here..." />
            <button type="button" onClick={() => this.sendMessage(message)}>Send</button>
        </div>
      </div>
    )
    */
  }
}
//Needs connections to: Users, Messages for current room, Current room name
export default Chat;