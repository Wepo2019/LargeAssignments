import React from 'react';
import { Link } from 'react-router-dom';
const CheckOut = () => {

    return (
        <>
        <div> Check out Bla</div>
        <button><Link className="checkout-button" to='/pickup'>Store pickup</Link></button>
        <button><Link className="checkout-button" to='/delivered'>Delivered</Link></button>
        </>
    )

};

export default CheckOut;
