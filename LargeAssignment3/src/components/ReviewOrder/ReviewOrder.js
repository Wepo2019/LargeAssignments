import React from 'react';
import Cart from '../Cart/Cart';
import orderService from '../../services/orderService';

class ReviewOrder extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userInfo: JSON.parse(localStorage.getItem('user')),
            cart: JSON.parse(localStorage.getItem('cart'))
        }
    }

    confirm(e) {
        let wasSuccessfull = orderService.sendOrder(this.state.userInfo, this.state.cart);

        if(wasSuccessfull) {
            localStorage.clear();
            this.props.history.push('/');
        }
        else {
            //redirect to something went wrong page
        }
    }

    cancel(e) {
        localStorage.clear();
        this.props.history.push('/cart');
    }


    render() {
        return (
            <>
            <div>
                <h3>{this.state.userInfo.name}</h3>
                <p>{this.state.userInfo.address}</p>
                <p>{this.state.userInfo.city}</p>
                <p>{this.state.userInfo.telephone}</p>
                <p>{this.state.userInfo.region}</p>
            </div>
            <div>
                <Cart reviewStatus={{review:true}} />
            </div>
            <div>
                <button className="cart-button" onClick={ e => this.confirm(e) }>Confirm</button>
                <button className="cart-button" onClick={ e => this.cancel(e) }>Cancel Order</button>
            </div>
            </>
        )
    }
}


export default ReviewOrder;
