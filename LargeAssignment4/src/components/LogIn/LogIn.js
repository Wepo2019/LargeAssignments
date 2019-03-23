import React from 'react';
import { connect } from 'react-redux';
import { socket } from '../../services/socketService';
import { addUser } from '../../actions/userActions';
import PropTypes from 'prop-types';


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
        this.props.history.push("/ChatIO");
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
      <div> 
        <h1 className="welcome">Welcome to Chat.IO</h1>
        <h2 className="please">Please choose your nickname before entering!</h2>
      <div className="text-center" style={{ marginTop: 40 }}>
        <form action="" onSubmit={e => this.onSubmit(e)} className="form-horizontal">
          <div className="login-form">
            <input type="text" name="name" id="name" value={ name } onChange={e => this.onInput(e)}
             placeholder="Enter your nick here.." /> <input type="submit" value="Login!" className="login-button"/>
          </div>
        </form>
        <div className="login-smile">
            <img src="../../broskall3.png" className="chat-logo" style={{ width: 400 }}></img>
        </div>
      </div>
      </div>
    )
  }
}


Login.propTypes = {
  addUser: PropTypes.func.isRequired
};  


export default connect(null, { addUser })(Login);