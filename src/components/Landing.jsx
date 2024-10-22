import React from 'react';
import logo from '../assets/retisLogo.svg';
import Backdrop from './Backdrop'; 

export default function Landing() {
  return (
    <div className="landing">
      
      <div className="landing-logo">
        <img 
          src={logo} 
          alt="Retis Logo"
        />
      </div>
      <Backdrop />
      {/* <div className="textBox">
      <h1 className="title" >Unparalleled Discovery</h1>
      <p1 className="description" >supercharging intelligence via novel neural networks</p1>
      </div> */}
    </div>
  );
}

