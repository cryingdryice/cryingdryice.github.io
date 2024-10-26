import React from 'react';
import '../../styles/StarNavbar.scss';
import { Link } from 'react-router-dom';

const StarNavbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to={'/'}>Home</Link></li>
        <li><Link to={'/'}>Projects</Link></li>
        <li><Link to={'/'}>Insights</Link></li>
        <li><Link to={'/'}>About</Link></li>
        <li><Link to={'/'}>Contact</Link></li>
      </ul>
    </nav>
  );
};

export default StarNavbar;
