import React from 'react';
import { socket } from '../../services/socketService';

class Chat extends React.Component {
  componentDidMount() {

  }

  constructor(props) {
    super(props);
  }
  
  //Render todo:
  /*
   Messages window
   Message typing input
   Message send button

   List of users in the current room
   */

  render() {
    return (
      <div></div>
    )
  }
}
//Needs connections to: Users, Messages for current room, Current room name
export default Chat;