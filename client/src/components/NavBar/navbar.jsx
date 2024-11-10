import './navbar.css';
import { Modal, Button, Input } from 'antd';
import { useState } from 'react';

const Navbar = () => {
  return (
    <div className="Navbar">
      <h2>TODO.s</h2>
      <p>HOME</p>
      <p>TODO-LIST</p>
      <p>COMPLETED</p>
    </div>
  );
};
export default Navbar;
