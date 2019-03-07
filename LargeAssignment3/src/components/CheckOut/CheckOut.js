import React from 'react';
import { Link } from 'react-router-dom';
const CheckOut = () => {

    return (
        <>
        <div className="dp-div" style={{ width: 700 }}>
            <h2>Do you want to arrange a store-pickup or have it delivered?</h2>
            <button className="pickup-button"><Link className="bubble-link-black" to='/pickup'>Store pickup</Link></button>
            <button className="delivered-button"><Link className="bubble-link-black" to='/delivered'>Delivered</Link></button>
        </div>
        </>
    )
};

export default CheckOut;
