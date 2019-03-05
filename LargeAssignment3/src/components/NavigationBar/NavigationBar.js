import React from 'react';
import NavLinks from '../NavLinks/NavLinks';
/**
 * This is the apps NavBar, we need a some sort of logo here
 */

const NavigationBar = () => {
  return (
    <nav className="navbar navbar-expand-lg  navigation-bar">
        <NavLinks />
    </nav>
  )
};

export default NavigationBar;
