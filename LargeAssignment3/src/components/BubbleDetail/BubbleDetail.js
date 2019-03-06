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
            <div className="detail-products" style={{ width: 900 }} >
            <div className="detail-header">{this.state.bubble.name}</div><br></br>
            <div className="detail-description">{this.state.bubble.description}</div><br></br>
            <div className="detail-price">{this.state.bubble.price} kr. </div><br></br>
            <img src={this.state.bubble.image} alt="" style={{ width: 120 }}></img><br></br>
            <button onClick={ e => this.handleClick(e) }>Add to Cart</button>
            </div>
            </>
        );
    }
};

export default BubbleDetail;
