import React from 'react';
import CheckOut from '../CheckOut/CheckOut';
import BubbleDetail from '../BubbleDetail/BubbleDetail';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Cart extends React.Component {
    componentDidMount() {
        console.log(this.props);
        const cartItems = this.state.storage;
        console.log(cartItems);
        let htmlItems = [];

        if(cartItems) {
            htmlItems.push(<h4 key='yourOrder'>Your order:</h4>);
            //Bubbles
            if(cartItems.bubbles.length > 0) {
                let eachBubbleInfo = [];
                let cartSection = [];
                cartSection.push(<p key="bubblesTitle" className="detail-header">Bubbles:</p>);

                for(let i = 0; i < cartItems.bubbles.length; i++) {
                    eachBubbleInfo.push(
                            <div key={"myBubble" + i}>
                            {<BubbleDetail bubbleid={cartItems.bubbles[i].id}/>}
                            </div>
                        );
                }
                cartSection.push(<div key="bubblesChild">{eachBubbleInfo}</div>);
                htmlItems.push(<div key="bubbles">{cartSection}</div>);
            }

            //Bundles
            if(cartItems.bundles.length > 0) {
                let cartSection = [];
                cartSection.push(<h4 key="bundlesTitle" className="detail-header">Bundles:</h4>);

                for(let i = 0; i < cartItems.bundles.length; i++) {
                    console.log("bundle number: " + i);
                    let innerBundleInfo = [];
                    innerBundleInfo.push(<p key={cartItems.bundles[i].name + i}>{cartItems.bundles[i].name}</p>);


                    for(let j = 0; j < cartItems.bundles[i].items.length; j++) {
                        console.log(cartItems.bundles[i].items[j]);
                        innerBundleInfo.push(<div key={"myBundleItems" + (cartItems.bundles[i].items[j])}>{<BubbleDetail bubbleid={cartItems.bundles[i].items[j]}/>}</div>);
                        <BubbleDetail bubbleid={cartItems.bundles[i].items[j]}/>
                    }
                    cartSection.push(<div key={cartItems.bundles[i].name + i}>{innerBundleInfo}</div>);
                }
                htmlItems.push(<div key="bundles">{cartSection}</div>);
            }
            console.log(this.props);
            if(this.props.reviewStatus.review !== true || ((this.state.storage.bubbles.length < 0) && (this.state.storage.bundles.length < 0))) {
                const checkOutButton = [
                    <div key="checkout-div" className="checkout-div" style={{ width: 700 }}>
                        <h2 key="checkout-title" >Do you wish to check out?</h2>
                        <button key="checkout-btn" className="checkout-button"><Link className="bubble-link-black" to='/checkout'>Checkout</Link></button>
                    </div>
                    ];
                htmlItems.push(checkOutButton);
            }

            this.setState({renderItems: htmlItems});
        }
        else {
            htmlItems.push(<h4 key='yourOrder'>Your cart is empty:</h4>);
        }
        this.setState({renderItems: htmlItems});
    }

    constructor(props) {
        //localStorage.clear(); // Taka út fyrir final product
        super(props);
        this.state = {
            storage: JSON.parse(localStorage.getItem("cart")),
            renderItems: []
        }
    }

    render() {
        return (
            <>
                <div className="order-div">
                    <h2>Your order:</h2>
                    <div className="items">{this.state.renderItems} </div>
                </div>
                <div className="checkout-div" style={{ width: 700 }}>
                    <h2>Do you wish to check out?</h2>
                <button className="checkout-button"><Link className="bubble-link-black" to='/checkout'>Checkout</Link></button>
                </div>
            </>
        )
    }
};

Cart.propTypes = {
    reviewStatus: PropTypes.shape({
        review: PropTypes.bool.isRequired
    })
};

Cart.defaultProps = {
    reviewStatus: {
        review: false
    }
}

export default Cart;
