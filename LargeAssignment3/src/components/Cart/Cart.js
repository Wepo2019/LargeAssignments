import React from 'react';
import CheckOut from '../CheckOut/CheckOut';
import { Link } from 'react-router-dom';

const Cart = () => {

    let cartItems = localStorage.getItem('cart');
    console.log(cartItems);

    return (
        <>
        <div className="checkout-div" style={{ width: 700 }}>
        <h2>Do you wish to check out?</h2>
        <button class="checkout-button"><Link className="bubble-link-black" to='/checkout'>Checkout</Link></button>
        </div>
        </>
    )
};

export default Cart;
