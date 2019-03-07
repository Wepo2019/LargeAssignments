import React from 'react';
import { NavLink } from 'react-router-dom';

const NavLinks = () => {
    return (
    <>
        <NavLink to='/'><img src="../../Bubblify2.png" id="logo"></img></NavLink>
        <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
                <NavLink  className="nav-link" to="/bubbles">Products</NavLink>
            </li>
            <li className="nav-item active">
                <NavLink className="nav-link" to="/bundles">Bundles</NavLink>
            </li>
            <li className="nav-item active">
                <NavLink className="nav-link" to="/about">About Us</NavLink>
            </li>
            <li className="nav-item active">
                <NavLink className="nav-link cart-right" to="/cart">Cart</NavLink>
            </li>
        </ul>
    </>
    )
};

export default NavLinks;
