import React from 'react';
import { connect } from 'react-redux';
import { socket } from '../../services/socketService';

class PrivateMessages extends React.Component {
    componentWillReceiveProps(nextProps) {
        if (nextProps.showAndTell !== this.state.showAndTell) {
            this.setState({ showAndTell: nextProps.showAndTell });
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            showAndTell: this.props.showAndTell,
            privateMessage: ""
        };
    }

    closePMs(e) {
        e.preventDefault();
        console.log("close clicked");
        this.setState({ showAndTell: {show: "none", recved: ""} });
        this.state.showAndTell.parentCallback();
    } 

    onInput(e) {
        this.setState({
            [e.target.name]: e.target.value
          });
    }

    onSendMessage(e) {
        e.preventDefault();
        const msgObj = { nick: this.state.showAndTell.person, message: this.state.privateMessage }
        socket.emit("privatemsg", msgObj, success => {
            if(success) {
                console.log("message sent!");
                this.setState({ showAndTell: {show: "none", recved: ""}, privateMessage: "" });
                this.state.showAndTell.parentCallback();
            }
            else {
                console.log("some shit went wrong bro");
            }
        });
    }

    render() {
        const fromHtml = [];
        if(this.state.showAndTell.recved !== "") {
            fromHtml.push(
                <div key="0" style={{borderStyle: "solid"}}>
                    <p key="1">From {this.state.showAndTell.person}:</p>
                    <p key="2">{this.state.showAndTell.recved}</p>
                </div>
            );
        }
        return (
            <div id="myModal" className="modal" style={{display: this.state.showAndTell.show}}>

                <div className="modal-content">
                    <span className="closeBtn" onClick={ e => this.closePMs(e) }>&times;</span>

                    <div>
                        { fromHtml }
                        <p>Send message to { this.state.showAndTell.person }?</p>
                        <form action="" onSubmit={ e => this.onSendMessage(e) } className="form-horizontal">
                            <div className="room-list-form">
                                <textarea name="privateMessage" rows="7" cols="143" value={ this.state.privateMessage } onChange={ e => this.onInput(e) } placeholder="Enter message..."></textarea>
                                
                            </div>
                            <input type="submit" value="Send" className="room-button" />
                        </form>
                    </div>
                    
                </div>

            </div>
        )
    }
}

export default PrivateMessages;