import React from 'react';
import Cart from '../Cart/Cart';

class ReviewOrder extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userInfo: JSON.parse(localStorage.getItem('user'))
        }
    }

    confirm(e) {
        //localStorage.clear(); // Taka út fyrir final product
        /*if(localStorage.getItem('cart') === null) {
            let item = {bubbles: [], bundles: [] };
            localStorage.setItem('cart', JSON.stringify(item));
        }
       let item = JSON.parse(localStorage.getItem('cart'));
       item.bubbles.push(this.state.bubble);
       localStorage.setItem('cart', JSON.stringify(item));
       */
      console.log("HELLO DARKNESS MY OLD FRIEND");
    }

    cancel(e) {
        localStorage.clear();
        this.props.history.push('/cart');
    }


    render() {
        return (
            <>
            <div className="confirmation">
                <h1>Your confirmation details</h1>
                <h3>{this.state.userInfo.name}</h3>
                <p>{this.state.userInfo.address}</p>
                <p>{this.state.userInfo.city}</p>
                <p>{this.state.userInfo.telephone}</p>
                <p>{this.state.userInfo.code}</p>
            </div>
            <div>
                <Cart reviewStatus={{review:true}} />
            </div>
            <div>
                <button className="cancel-button bubble-link-black" onClick={ e => this.cancel(e) }>Cancel Order</button>
                <button className="confirm-button bubble-link-black" onClick={ e => this.confirm(e) }>Confirm</button>
            </div>
            </>
        )
    }
}


export default ReviewOrder;
