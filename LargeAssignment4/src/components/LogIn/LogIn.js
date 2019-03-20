import React from 'react';
import { socket } from '../../services/socketService';

class Login extends React.Component {
  componentDidMount() {
    socket.on('users', userList => {
      this.setState({
        usernames: userList
      });
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      usernames: []
    };
  }

  onInput(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    //Compare this.state.name to the server userlist
    //if found in list, throw something on the screen and reset the page
    //if not found
    //register the user with the server and redirect to chat room selection
  }

  render() {
    const { name } = this.state;
    return (
      <div className="text-center" style={{ marginTop: 40 }}>
        <form action="" onSubmit={e => this.onSubmit(e)} className="form-horizontal">
          <div className="form-group">
            <input type="text" name="name" id="name" value={ name } onChange={e => this.onInput(e)} />
          </div>
          <div className="form-group">
            <input type="submit" value="Login!" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}

export default Login;