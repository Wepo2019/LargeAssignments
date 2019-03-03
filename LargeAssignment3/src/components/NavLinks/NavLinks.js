import React from 'react';

/**
 * This is the NavLinks in the NavigationBar
 * Should route to Products, Bubbles (and with id), About us and users Cart
 */

const NavLinks = () => {
    return (
        <ul className="navigation-links">
            <li>Product</li>
            <li>Bubbles</li>
            <li>About Us</li>
            <li>Cart</li>
        </ul>
    )
};

export default NavLinks;
