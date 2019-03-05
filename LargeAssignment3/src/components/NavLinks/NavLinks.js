import React from 'react';
import { NavLink } from 'react-router-dom';
/**
 * This is the NavLinks in the NavigationBar
 * Should route to Products, Bubbles (and with id), About us and users Cart
 * ATH það á eftir að útfæra product, bubbles og cart, rútunar benda á homepage
 */

const NavLinks = () => {
    return (
        <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
                <NavLink  className="nav-link" to="/bubbles">Products</NavLink>
            </li>
            <li className="nav-item active">
                <NavLink className="nav-link" to="/">Bundles</NavLink>
            </li>
            <li className="nav-item active">
                <NavLink className="nav-link" to="/about">About Us</NavLink>
            </li>
            <li className="nav-item active">
                <NavLink className="nav-link" to="/">Cart</NavLink>
            </li>
        </ul>
    )
};

export default NavLinks;
