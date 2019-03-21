import React from 'react';
import { socket } from '../../services/socketService';

class Rooms extends React.Component {
  componentDidMount() {
    console.log("ROOMS COMPONENT MOUNTING AND SETTING USE INTO LOBBY ROOM");
    socket.emit("rooms");
    socket.on("roomlist", roomlist => this.setState({ roomlist }));
    //join the default lobby
    socket.emit("joinroom", {room: "lobby"}, dasBool => {
      if(dasBool) {
        console.log("The user joined the default lobby!");
      }
      else {
        console.log("Something went wrong while trying to join the default lobby");
      }
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      roomlist: {},
      allUsers: {},
      roomName: ""
    };
  }

  onInput(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  //Create a new room
  onSubmit(e) {
    e.preventDefault();
    socket.emit("joinroom", { room: this.state.roomName }, success => {
      if(success) {
        socket.emit("rooms");
        this.setState({ roomName: "" });
        console.log("The user created and joined a new room!");
      }
      else {
        console.log("The user failed to create and join a new room!");
      }
    });
  }

  joinNewRoom(e) {
    socket.emit("joinroom", { room: e.target.name }, success => {
      if(success) {
        socket.emit("rooms");
        console.log("User joined a new existing room");
      }
      else {
        console.log("User failed to join a new existing room");
      }
    });
  }

  //Render todo:
  /*
   Rooms title
   A div with an non-numbered list of rooms names
   Button to create a new room with
   */
  render() {
    var roomsHTML = [];
    var k;
    for(k in this.state.roomlist) {
      if(this.state.roomlist.hasOwnProperty(k)) {
        console.log(k);
        roomsHTML.push(<button key={k} type="button" name={k} onClick={ e => this.joinNewRoom(e) }>{ k }</button>);
      }
    }
    return (
      <div>
          {roomsHTML}
          <form action="" onSubmit={ e => this.onSubmit(e) } className="form-horizontal">
            <div className="form-group">
              <input type="text" name="roomName" id="roomName" value={ this.state.roomName } onChange={ e => this.onInput(e) } />
            </div>
            <div className="form-group">
              <input type="submit" value="Create Room!" className="btn btn-primary" />
            </div>
        </form>
      </div>
    )
  }
}

export default Rooms;