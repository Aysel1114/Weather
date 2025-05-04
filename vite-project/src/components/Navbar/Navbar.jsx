import React from 'react'
import css from './Navbar.module.css';
import { useLocation, useNavigate } from 'react-router-dom';


export default function Navbar() {

  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/panelLogin');
  }

  return (
    <div className = {css.container}>
        <div className={css.logo}>
          <img className={css.image} src = "https://i.postimg.cc/8593cMvh/storm.png" />
          <h1 className={css.logoName}>SkyPulse</h1>
        </div>
    </div>
  )
}
