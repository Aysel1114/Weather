import React from 'react';
import css from './Sidebar.module.css';
import { useLocation, useNavigate } from 'react-router';

export default function Sidebar({currentWeather}) {

    const location = useLocation();
    const navigate = useNavigate();

    const onMapClick = () => {
        if (currentWeather && currentWeather.city) {
            const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(currentWeather.city)}`;
            window.open(mapUrl, "_blank");
        }
    };

    const handleNavigatetoHome = () => {
        navigate('/home2');
    }
    
    const handleNavigatetoNews = () => {
        navigate('/news');
    }
  return (
    <div className={css.container}>
        <div>
            <img className={css.img} src = "https://i.postimg.cc/WbyzDYm5/snow.png" />
        </div>
        <div className={css.menu}>
            <ul className={css.items}>
                <li onClick={handleNavigatetoHome} className={css.item}>
                    <img className={css.icon} src = "https://i.postimg.cc/Dwqh2xxJ/home.png" />
                    Home
                </li>
                <li onClick={handleNavigatetoNews} className={css.item}>
                    <img className={css.icon} src = "https://i.postimg.cc/fRh4gxMw/newspaper-folded.png" />
                    News
                </li>
                <li onClick={onMapClick} className={css.item}>
                    <img className={css.icon} src = "https://i.postimg.cc/bwHXXsv1/maps.png" />
                    Map
                </li>
            </ul>
        </div>
    </div>
  )
}
