import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import css from './Home2.module.css';
import Navbar2 from '../../components/Navbar2/Navbar2';
import 'swiper/css/bundle';
import HourlySwiper from '../../components/HourlySwiper/HourlySwiper';
import GeneralWeather from '../../components/GeneralWeather/GeneralWeather';
import CitiesWeather from '../../components/CitiesWeather/CitiesWeather';

export default function Home2() {

    const [search, setSearch] = useState("");
    const [result, setResult] = useState("Baku");
    const [favouriteCities, setFavouriteCities] = useState([]);

    const [currentWeather, setCurrentWeather] = useState({ city: "Baku", country: "Azerbaijan" });


    useEffect(() => {
        const storedCities = JSON.parse(localStorage.getItem("favouriteCities"));
        if (storedCities) {
            setFavouriteCities(storedCities);
        }
    }, []);

    const handleAddFavourite = () => {
        if (!favouriteCities.some(city => city.city === currentWeather.city)) {
            const updatedCities = [
                ...favouriteCities,
                {
                    city: currentWeather.city,
                    text: currentWeather.condition,
                    icon: currentWeather.icon,
                    maxTemp: currentWeather.temperature + 2,
                    minTemp: currentWeather.temperature - 2,
                    avgTemp: currentWeather.temperature,
                }
            ];

            setFavouriteCities(updatedCities);
            localStorage.setItem("favouriteCities", JSON.stringify(updatedCities));
        }
    };

    const handleRemoveFavourite = (cityName) => {
        const updatedCities = favouriteCities.filter(city => city.city !== cityName);
        setFavouriteCities(updatedCities);
        localStorage.setItem("favouriteCities", JSON.stringify(updatedCities));
    };

    const handleSearch = () => {
        setResult(search);
    };

    return (
        <div className={css.container}>

            <div className={css.navbar2}>
                <Navbar2 setSearch={setSearch} onSearch={handleSearch} result={result} currentWeather={currentWeather} onAddFavourite={handleAddFavourite} />
            </div>

            <div className={`${css.main} hidden xl:block`}>
                <Sidebar currentWeather={currentWeather} />
            </div>

            <div className={css.content}>
                <div className={css.firstPart}>
                    <div className={css.left}>
                        <GeneralWeather city={result} onWeatherUpdate={setCurrentWeather} />
                    </div>
                    <div className={css.right}>
                        <CitiesWeather favouriteCities={favouriteCities} onRemoveFavourite={handleRemoveFavourite} setResult={setResult} />
                    </div>
                </div>
                <div className={css.secondPart}>
                    <HourlySwiper city={result} />
                </div>
            </div>
        </div>
    )
}