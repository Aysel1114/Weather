import React, { useEffect, useState } from 'react';
import css from './Navbar2.module.css';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';

export default function Navbar2({ search, setSearch, onSearch, currentWeather, onAddFavourite }) {

  const [showSidebarMenu, setShowSidebarMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1200);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1200);
      if (window.innerWidth >= 1200) {
        setShowSidebarMenu(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const changeHandler = (event) => {
    const value = event.target.value;
    setSearch(value);
  }

  return (
    <div className={css.container}>
      <div className={css.div}>
        <img className={css.img} src="https://i.postimg.cc/xCSDBMvG/pin.png" />
        <div className={css.location}>{currentWeather.city}, {currentWeather.country}</div>
      </div>
      <div className={css.div}>
        <input onChange={changeHandler} value={search} className={css.input} type='text' placeholder='Search here...' />
        <img onClick={onSearch} className={`${css.img} ${css.searchIcon}`} src="https://i.postimg.cc/3NJ6HBdG/search.png" />
      </div>
      <div className={`${css.div} ${css.lastDiv}`}>
        <img onClick={onAddFavourite} className={`${css.img} ${css.add}`} src="https://i.postimg.cc/3wNzpCnj/add.png" />
        {isMobile && (
          <GiHamburgerMenu className={css.hamburger} onClick={() => setShowSidebarMenu(!showSidebarMenu)} />
        )}
        <img className={css.account} src="https://i.postimg.cc/FKcWMP0m/round-account-button-with-user-inside_(1).png" />
      </div>

      {isMobile && showSidebarMenu && (
        <div className={css.dropdownMenu}>
          <ul className={css.miniSidebar}>
            <li onClick={() => navigate('/home2')} className={css.miniItem}>
              <img className={css.icon} src="https://i.postimg.cc/Dwqh2xxJ/home.png" alt="home" />
              Home
            </li>
            <li onClick={() => navigate('/news')} className={css.miniItem}>
              <img className={css.icon} src="https://i.postimg.cc/fRh4gxMw/newspaper-folded.png" alt="news" />
              News
            </li>
            <li onClick={() => {
              if (currentWeather?.city) {
                const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(currentWeather.city)}`;
                window.open(mapUrl, "_blank");
              }
            }} className={css.miniItem}>
              <img className={css.icon} src="https://i.postimg.cc/bwHXXsv1/maps.png" alt="map" />
              Map
            </li>
          </ul>
        </div>
      )}

    </div>
  )
}
