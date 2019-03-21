import React from 'react';
import { connect } from 'react-redux';
import { socket } from '../../services/socketService';
import { addUser } from '../../actions/userActions';

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      error: ""
    };
  }

  onInput(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  addUserToServer(name) {
    socket.emit("adduser", name, available => {
      if (available && name !== '') {
        console.log("Login Successfull!");
        this.setState({name: ""});
        this.props.history.push("/ChatIO")
      }
      else {
        console.log("Login Failed!");
        this.setState({name: "", error: "Username already taken!"});
        alert(this.state.error);
      }
    });
  }


  onSubmit(e) {
    e.preventDefault();
    //remove later probably
    const { addUser } = this.props;

    addUser(this.state.name);

    this.addUserToServer(this.state.name);
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

export default connect(null, { addUser })(Login);