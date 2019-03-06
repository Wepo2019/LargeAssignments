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
        localStorage.clear(); // Taka út fyrir final product
        if(localStorage.getItem('cart') === null) {
            let item = {bubbles: [], bundles: [] };
            localStorage.setItem('cart', JSON.stringify(item));
        }
       let item = JSON.parse(localStorage.getItem('cart'));
       item.bubbles.push(this.state.bubble);
       localStorage.setItem('cart', JSON.stringify(item));
    }

    render() {
        return (
            <>
            <span>{this.state.bubble.name}</span>
            <span>{this.state.bubble.description}</span>
            <span>{this.state.bubble.price}</span>
            <img src={this.state.bubble.image} alt=""></img>
            <button onClick={ e => this.handleClick(e) }>Add to Cart</button>
            </>
        );
    }
};

export default BubbleDetail;
