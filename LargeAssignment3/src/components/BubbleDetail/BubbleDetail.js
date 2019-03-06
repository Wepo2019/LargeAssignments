import React from 'react';
import bubbleService from '../../services/bubbleService';

class BubbleDetail extends React.Component {
    componentDidMount() {
        bubbleService.getSingleBubble(this.props.match.params.bubbleid).then(data => this.setState({ bubble: data}));
    }

    constructor(props) {
        super(props);
        this.state = {
            bubble: {}
        }
    }

    render() {
        return (
            <>
            <h4>{this.state.bubble.name}</h4>
            <p>{this.state.bubble.description}</p>
            <p>{this.state.bubble.price}</p>
            <img src={this.state.bubble.image} alt=""></img>
            </>
        );
    }
};

export default BubbleDetail;