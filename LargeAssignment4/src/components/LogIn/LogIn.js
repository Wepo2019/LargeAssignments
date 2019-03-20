import React from 'react';
import { connect } from 'react-redux';
import { socket } from '../../services/socketService';
import { addUser } from '../../action/userActions';

class Login extends React.Component {
  /*
  componentDidMount() {
    socket.on('users', userList => {
      this.setState({
        usernames: userList
      });
    });
  }
*/
  constructor(props) {
    super(props);
    this.state = {
      name: ''//,
      //usernames: []
    };
  }

  onInput(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
/*
  addUser(name) {
    console.log("hello");
    socket.emit("adduser", name, function(available){
      if (available && name !== '') {
        console.log("login success");
        this.setState({ name })
      }
      else {
        console.log("login failed");
      }
  });
  }
*/

  onSubmit(e) {
    e.preventDefault();
    //Compare this.state.name to the server userlist
    //if found in list, throw something on the screen and reset the page
    //if not found
    //register the user with the server and redirect to chat room selection
    const { addUser } = this.props;
    const { name } = this.state;
    addUser({ name });
    //ef addUser gengur upp redirect í chatio
    // annars eitthvað villa
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
/*
const mapStateToProps = reduxStoreState => {
  console.log(reduxStoreState);
  return {};
}
*/
//console.log(name);

export default connect(null, { addUser })(Login);