import React, { useState } from 'react';
import css from './Navbar2.module.css';

export default function Navbar2({ search, setSearch, onSearch, result, currentWeather, onAddFavourite }) {

  const [showSidebar, setShowSidebar] = useState(false);

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
        <img className={css.account} src="https://i.postimg.cc/FKcWMP0m/round-account-button-with-user-inside_(1).png" />
      </div>

    </div>
  )
}
