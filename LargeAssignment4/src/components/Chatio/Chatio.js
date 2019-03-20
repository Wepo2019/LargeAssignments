import React from 'react';
import { socket } from '../../services/socketService';

import Rooms from './components/Rooms/Rooms';
import Chat from './components/Chat/Chat';

class Chatio extends React.Component {
  componentDidMount() {

  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
          <Rooms />
          <Chat />
      </div>
    )
  }
}

export default Chatio;