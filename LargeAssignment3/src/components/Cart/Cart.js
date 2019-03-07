import React from 'react';
import CheckOut from '../CheckOut/CheckOut';
import { Link } from 'react-router-dom';

const Cart = () => {

    let cartItems = localStorage.getItem('cart');
    console.log(cartItems);

    return (
        <>
        <div>Bla</div>
       <button><Link className="bubble-link" to='/checkout'>Checkout</Link></button>
        </>
    )
};

export default Cart;
