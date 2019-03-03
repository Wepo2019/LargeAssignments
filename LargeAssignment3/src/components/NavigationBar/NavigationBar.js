import React from 'react';
import NavLinks from '../NavLinks/NavLinks';
/**
 * This is the apps NavBar, we need a some sort of logo here
 */

const NavigationBar = () => {
  return (
    <nav className="navigation-bar">
        <p>NAVBAR</p>
        <NavLinks />
    </nav>
  )
};

export default NavigationBar;
