import React from 'react';
import { socket } from '../../services/socketService';
import { connect } from 'react-redux';
import { findRoom } from '../../actions/roomActions';

class Rooms extends React.Component {
  componentDidMount() {
    socket.emit("rooms");
    
    socket.on("roomlist", roomlist => this.setState({ roomlist }));

    //testing other person update server list
    socket.on("updateusers", () => {
      socket.emit("rooms");
      socket.on("roomlist", roomlist => this.setState({ roomlist }));
    });
    
    //join the default lobby
    socket.emit("joinroom", {room: "lobby"}, dasBool => {
      if(dasBool) {
        console.log("The user joined the default lobby!");
        this.props.findRoom(this.state.currentRoom);
        socket.emit("rooms");
        socket.emit("updateusers");
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
      //socket.emit("rooms");
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

  // TODO
  /**
   * Þurfum hérna að gera lista af notendum undir hverju lobbyi, 
   * og render það
   */



  render() {
    var roomsHTML = [];
    var roomsUsersHTML = [];
    var roomsOpsHTML = [];
    var temp = [];
    var k;
    //Rendering all rooms in roomlist
    for(k in this.state.roomlist) {
      if(this.state.roomlist.hasOwnProperty(k)) {
        roomsHTML.push(<li key={"ul-" + k}><a href="url" key={"span-" + k} name={k} onClick={ e => this.joinNewRoom(e) }>{ k }</a></li>);
        //Rendering operators for each room
        for(var o in this.state.roomlist[k].ops) {
          if(this.state.roomlist[k].ops.hasOwnProperty(o)) {
            roomsOpsHTML.push(<li key={ "op-" + o + k }> + { o }</li>);
          } 
        }
        temp.push(roomsOpsHTML);
        roomsOpsHTML = [];
        //Rendering users for each room
        for(var u in this.state.roomlist[k].users) {
          if(this.state.roomlist[k].users.hasOwnProperty(u)) {
            console.log(u);
            roomsUsersHTML.push(<li className="user-in-room" key={ "us-" + u + k }>User: { u }</li>);
          }
        }
        temp.push(<ul key={ "temp" + k }>{ roomsUsersHTML }</ul>);
        roomsHTML.push(temp);
        roomsUsersHTML = [];
        temp = [];
      }
    }

    return (
      <div>
        <div className="room-form">
            <div className="black-form">
              <h3>Chat rooms -  { this.state.currentRoom }</h3>
                <ul id="rooms-list" style={{listStyle: "none"}}>
                  {roomsHTML}
                </ul>
              </div>
            <div className="test">
              <form action="" onSubmit={ e => this.onCreateNewRoom(e) } className="form-horizontal">
                <div className="room-list-form">
                  <input type="text" name="createRoomName" id="createRoomName" value={ this.state.createRoomName } onChange={ e => this.onInput(e) } placeholder="Name of new room.." />
                  <input type="submit" value="Create Room!" className="room-button" />
                </div>
              </form>
            </div>
        </div>
      </div>
    )
  }
}

export default connect(null, { findRoom })(Rooms);