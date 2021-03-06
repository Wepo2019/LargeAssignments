import React from 'react';
import { socket } from '../../services/socketService';
import { connect } from 'react-redux';
import { findRoom } from '../../actions/roomActions';
import PrivateMessages from '../PrivateMessages/PrivateMessages';
import PropTypes from 'prop-types';


class Rooms extends React.Component {
  componentDidMount() {
    socket.emit("rooms");
    
    socket.on("roomlist", roomlist => this.setState({ roomlist }));

    socket.on("updateusers", () => {
      socket.emit("rooms");
      socket.on("roomlist", roomlist => this.setState({ roomlist }));
    });

    socket.on("kicked", (kickedRoom, kickedUser, whoKicked) => {
      if(this.state.name == kickedUser) {
        socket.emit("joinroom", {room: "lobby"}, dasBool => {
          if(dasBool) {
            console.log("The user joined the default lobby after being kicked!");
            this.setState({ currentRoom: "lobby" });
            socket.emit("rooms");
            socket.emit("updateusers");
          }
          else {
            console.log("Something went wrong while trying to join the default lobby after being kicked");
          }
        });
      }
    });

    socket.on("banned", (bannedRoom, bannedUser, whoBanned) => {
      if(this.state.name == bannedUser) {
        socket.emit("joinroom", {room: "lobby"}, dasBool => {
          if(dasBool) {
            console.log("The user joined the default lobby after being banned!");
            this.setState({ currentRoom: "lobby" });
            socket.emit("rooms");
            socket.emit("updateusers");
          }
          else {
            console.log("Something went wrong while trying to join the default lobby after being banned");
          }
        });
      }
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

    socket.on("recv_privatemsg", (recv_username, recv_msg) => {
      this.setState({
        showPMs: "block", 
        recv_message: recv_msg, 
        clickedName: recv_username
      });
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      name: this.props.user,
      roomlist: {},
      createRoomName: "",
      currentRoom: "lobby",
      showPMs: "none",
      clickedName: "",
      recv_message: "",
      clearRecentPM: () => {
        this.setState({ recv_message: "", showPMs: "none" });
      }
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
      socket.emit("joinroom", { room: newRoom }, (success, reason) => {
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
      this.props.findRoom(newRoom);
    }
  }

  joinNewRoom(e) {
    e.preventDefault();
    socket.emit("partroom", this.state.currentRoom);
    socket.emit("joinroom", { room: e.target.name }, (success, reason) => {
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

  pmsClicked(e) {
    e.preventDefault();
    this.setState({ showPMs: "block", clickedName: e.target.name})
  }

  kickUser(e) {
    e.preventDefault();
    console.log(e.target.name);
    const kickedObj = { user: e.target.name, room: this.state.currentRoom };
    socket.emit("kick", kickedObj, success => {
      if(success) {
        console.log("kicked user");
      }
      else {
        console.log("failed to kick this user");
      }
    });
  }

  banUser(e) {
    e.preventDefault();
    const banObj = { user: e.target.name, room: this.state.currentRoom }
    socket.emit("ban", banObj, success => {
      if(success) {
        console.log("banned this user");
      }
      else {
        console.log("failed to ban this user :(");
      }
    });
  }

  opUser(e) {
    e.preventDefault();
    const opObj = { user: e.target.name, room: this.state.currentRoom };
    socket.emit("op", opObj, success => {
      if(success) {
        console.log("opped this user");
      }
      else {
        console.log("failed to op this user");
      }
    });
  }

  render() {
    var roomsHTML = [];
    var roomsUsersHTML = [];
    var roomsOpsHTML = [];
    var temp = [];
    var k;
    //Rendering all rooms in roomlist
    for(k in this.state.roomlist) {
      if(this.state.roomlist.hasOwnProperty(k)) {
        if(this.state.roomlist[k].banned.hasOwnProperty(this.state.name)) {
          continue;
        }
        roomsHTML.push(<li key={"ul-" + k}><a href={k} key={"span-" + k} name={k} onClick={ e => this.joinNewRoom(e) }>{ k }</a></li>);
        //Rendering operators for each room
        var amOp = false;
         for(var o in this.state.roomlist[k].ops) {
          if(this.state.roomlist[k].ops.hasOwnProperty(o)) {
            if(o == this.state.name) amOp = true;
            roomsOpsHTML.push(
            <li className="user-in-room" key={ "op-" + o + k }>
             <a href={o} key={ "op-" + o + k } name={ o } onClick={ e => this.pmsClicked(e) }>+ { o } </a>
            </li>
            );
          } 
        }
        temp.push(roomsOpsHTML);
        roomsOpsHTML = [];
        //Rendering users for each room
        var i = 0;
        for(var u in this.state.roomlist[k].users) {
          i++;
          if(this.state.roomlist[k].users.hasOwnProperty(u)) {
            if(k == this.state.currentRoom && amOp) {
              roomsUsersHTML.push(
                <li className="user-in-room" key={ "us-" + u + k }>
                  <a href={u} key={ "us-" + u + k } name={ u } onClick={ e => this.pmsClicked(e) }>- { u }</a>
                  <button className="button5" key={ "kick-" + u + k } name={ u } onClick={ e => this.kickUser(e) }>Kick</button>
                  <button className="button5" key={ "ban-" + u + k } name={ u } onClick={ e => this.banUser(e) }>Ban</button>
                  <button className="button5" key={ "op-" + u + k } name={ u } onClick={ e => this.opUser(e) }>+</button>
                </li>
                );
            }
            else {
              roomsUsersHTML.push(
                <li className="user-in-room" key={ "us-" + u + k }>
                  <a href={u} key={ "us-" + u + k } name={ u } onClick={ e => this.pmsClicked(e) }>- { u }</a>
                </li>
                );
            }
          }
        }
    
        temp.push(roomsUsersHTML);
        roomsHTML.push(<ul key={ "temp" + k } style={{listStyle: "none"}}>{ temp }</ul>);
        roomsUsersHTML = [];
        temp = [];
      }
    }

    return (
      <div>
        <div className="room-form">
            <div className="black-form">
              <h3>Chat rooms</h3>
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
        <div>
            <h3 className="current-chat"> You are currently in Chat Room - { this.state.currentRoom }</h3>
        </div>
        <PrivateMessages showAndTell={ { recved: this.state.recv_message, show: this.state.showPMs, person: this.state.clickedName, parentCallback: this.state.clearRecentPM} } />
      </div>
    )
  }
}

Rooms.propTypes = {
  user: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  findRoom: PropTypes.func.isRequired
};

const mapStateToProps = ({ user }) => {
  return {
    user
  };
};

export default connect(mapStateToProps, { findRoom })(Rooms);