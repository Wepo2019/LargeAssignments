import React from 'react';
import CheckOut from '../CheckOut/CheckOut';
import { Link } from 'react-router-dom';

class Cart extends React.Component {
    componentDidMount() {
        console.log(this.state.storage.bubbles);
        const cartItems = this.state.storage;
        let htmlItems = [];

        if(cartItems) {
            //Bubbles

            if(cartItems.bubbles.length > 0) {
                htmlItems.push(<p key="bubbles" className="detail-header">Bubbles:</p>);

                for(let i = 0; i < cartItems.bubbles.length; i++) {
                    htmlItems.push(<p key={"myBubble" + cartItems.bubbles[i].id}>{cartItems.bubbles[i].name}</p>);
                }
            }

            //Bundles
            if(cartItems.bundles.length > 0) {
                htmlItems.push(<p key="bundles" className="detail-header">Bundles:</p>);
    
                for(let i = 0; i < cartItems.bundles.length; i++) {
                    htmlItems.push(<p>{cartItems.bundles[i].name}</p>);
    
                    for(let j = 0; j < cartItems.bundles.items.length; j++) {
                        htmlItems.push(<p key={"myBundleItems" + cartItems.bundles[i].id + j}>{cartItems.bundles[i].items[j].name}</p>);
                    }
                }
            }

            this.setState({renderItems: htmlItems});
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            storage: JSON.parse(localStorage.getItem("cart")),
            renderItems: []
        }
    }
    
    render() {
        return (
            <>
            <div>
                <h4>Your order:</h4>
                {this.state.renderItems}
            </div>
            <button><Link className="bubble-link" to='/checkout'>Checkout</Link></button>
            </>
        )
    }
};

export default Cart;
