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
            <h3>{this.state.bubble.name}</h3>
        );
    }
};

export default BubbleDetail;