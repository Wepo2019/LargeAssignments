import React from 'react';
import { socket } from '../../services/socketService';
import { connect } from 'react-redux';
import { findRoom } from '../../actions/roomActions';

class Rooms extends React.Component {
  componentDidMount() {
    socket.emit("rooms");
    socket.on("roomlist", roomlist => this.setState({ roomlist }));
    //join the default lobby
    socket.emit("joinroom", {room: "lobby"}, dasBool => {
      if(dasBool) {
        console.log("The user joined the default lobby!");
        this.props.findRoom(this.state.currentRoom);
        socket.emit("rooms");
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
      createRoomName: "",
      currentRoom: "lobby"
    };
  }

  onInput(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  //Create a new room
  onCreateNewRoom(e) {
    e.preventDefault();
    const newRoom = this.state.createRoomName;
    if(newRoom !== "") {
      socket.emit("partroom", this.state.currentRoom);
      socket.emit("joinroom", { room: newRoom }, success => {
        if(success) {
          this.setState({ createRoomName: "" });
          console.log("The user to created and joined a new room as an op!");
          socket.emit("rooms");
        }
        else {
          console.log("The user failed to create and join a new room!");
        }
      });
      this.setState({ currentRoom: newRoom });
      console.log("Should change room states!");
      this.props.findRoom(newRoom);
    }
  }

  joinNewRoom(e) {
    e.preventDefault();
    socket.emit("partroom", this.state.currentRoom);
    socket.emit("joinroom", { room: e.target.name }, success => {
      if(success) {
        socket.emit("rooms");
        console.log("User joined a new existing room");
      }
      else {
        console.log("User failed to join a new existing room");
      }
    });
    this.setState({ currentRoom: e.target.name });
    this.props.findRoom(e.target.name);
  }

  render() {
    var roomsHTML = [];
    var k;
    for(k in this.state.roomlist) {
      if(this.state.roomlist.hasOwnProperty(k)) {
        roomsHTML.push(<li key={"ul-" + k}><button type="button" key={"span-" + k} name={k} onClick={ e => this.joinNewRoom(e) }>{ k }</button></li>);
      }
    }
    return (
      <div>
        <h3>Chat.IO</h3>
        <ul id="rooms-list" style={{listStyle: "none"}}>
          {roomsHTML}
        </ul>
          <form action="" onSubmit={ e => this.onCreateNewRoom(e) } className="form-horizontal">
            <div className="form-group">
              <input type="text" name="createRoomName" id="createRoomName" value={ this.state.createRoomName } onChange={ e => this.onInput(e) } />
            </div>
            <div className="form-group">
              <input type="submit" value="Create Room!" className="btn btn-primary" />
            </div>
        </form>
      </div>
    )
  }
}

export default connect(null, { findRoom })(Rooms);