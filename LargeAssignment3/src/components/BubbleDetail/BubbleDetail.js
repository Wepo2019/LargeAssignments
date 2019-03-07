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
        bubbleService.getSingleBubble(id).then(data => this.setState({ bubble: data}));


    }

    constructor(props) {
        super(props);
        this.state = {
            bubble: {}
        }
    }

    handleClick(e) {
        //localStorage.clear(); // Taka út fyrir final product
        if(localStorage.getItem('cart') === null) {
            let item = {bubbles: [], bundles: [] };
            localStorage.setItem('cart', JSON.stringify(item));
        }
       let item = JSON.parse(localStorage.getItem('cart'));
       item.bubbles.push(this.state.bubble);
       localStorage.setItem('cart', JSON.stringify(item));
    }

    render() {

        let htmlElements = [
            <div key={1}>
                <div key={this.state.bubble.id} className="detail-header">{this.state.bubble.name}</div>
                <div key={"mykey" + this.state.bubble.id + 1} className="detail-description">{this.state.bubble.description}</div>
                <div key={"mykey" + this.state.bubble.id + 2} className="detail-price">{this.state.bubble.price} kr. </div>
                <img key={"mykey" + this.state.bubble.id + 3} src={this.state.bubble.image} alt="" style={{ width: 120 }}></img>
            </div>
        ];

        if(this.props.match) {
            htmlElements.push(<button key={2} className="cart-button" onClick={ e => this.handleClick(e) }>Add to Cart!</button>);
        }

        return (
            <>
                <div className="detail-products" style={{ width: 900 }} >
                {htmlElements}
                </div>
            </>
        );
    }
};

export default BubbleDetail;
