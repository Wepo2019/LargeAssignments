import React from 'react';
import bubbleService from '../../services/bubbleService';

class BubbleDetail extends React.Component {
    componentDidMount() {
        let id;

        if(this.props.match) {
            id = this.props.match.params.bubbleid;
        }
        else {
            id = this.props.bubbleid;
        }

        console.log(id);
        bubbleService.getSingleBubble(id).then(data => this.setState({ bubble: data}));


    }

    constructor(props) {
        super(props);
        this.state = {
            bubble: {}
        }
    }

    handleClick(e) {
        e.preventDefault();
        console.log('The link was clicked');
    }

    render() {
        return (
            <>
            <span>{this.state.bubble.name}</span>
            <span>{this.state.bubble.description}</span>
            <span>{this.state.bubble.price}</span>
            <img src={this.state.bubble.image} alt=""></img>
            <button onClick={ this.handleClick }>Add to Cart</button>
            </>
        );
    }
};

export default BubbleDetail;
