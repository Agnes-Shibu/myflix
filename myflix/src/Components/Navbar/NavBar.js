import React from 'react'
import "./NavBar.css";
import mlogo from './mlogo.png';

function NavBar() {
  return (
    <div className='navbar'>
        <img className='logo' src={mlogo} alt="netflix logo" />
        <img className='avatar' src='https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png' alt="Avatar" />
    </div>
  )
}

export default NavBar