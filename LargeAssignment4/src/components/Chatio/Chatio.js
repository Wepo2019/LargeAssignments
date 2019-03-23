import React from 'react';
import { connect } from 'react-redux';
import { socket } from '../../services/socketService';

import Rooms from '../Rooms/Rooms';
import Chat from '../Chat/Chat';

class Chatio extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: this.props.user
    };
  }

  render() {
    return (
      <div>
        <h1 className="welcome2">Welcome to Chat.IO { this.state.name }! - Please chat away!</h1>
          <Rooms />
          <Chat />
      </div>
    )
  }
}

const mapStateToProps = ({ user }) => {
  return {
    user
  };
};

export default connect(mapStateToProps)(Chatio);