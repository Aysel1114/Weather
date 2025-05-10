import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import css from './GeneralWeather.module.css';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';
import TodayWeatherInfo from '../TodayWeatherInfo/TodayWeatherInfo';

export default function GeneralWeather({city, onWeatherUpdate }) {

    const [currentWeather, setCurrentWeather] =  useState({});
    const [forecast, setForecast] = useState([]);
    const newApi = "7d6038628cdc44b5a44103754250405";

    const countryAbbreviations = {
        "United Kingdom": "UK",
        "United States": "USA",
        "United Arab Emirates": "UAE",
    };

    useEffect(() => {
        fetch(`https://api.weatherapi.com/v1/forecast.json?key=${newApi}&q=${city}&days=7`)
        .then((res) => res.json())
        .then((data) => {
            const temperature = data.current;
            const condition = data.current.condition;
            const location = data.location;
            const country = location.country.length > 10 ? (countryAbbreviations[location.country] || location.country) : location.country;

            const newWeather = {
                city: location.name,
                country: country,
                condition: condition.text,
                icon: condition.icon,
                temperature: temperature.temp_c,
                feelsLike: temperature.feelslike_c, 
                uv: temperature.uv,
                cloud: temperature.cloud,
                humidity: temperature.humidity,
                visibility: temperature.vis_km,
                wind: temperature.wind_kph,
            };

            setCurrentWeather(newWeather);
            onWeatherUpdate(newWeather);

            const dailyWeather = data.forecast.forecastday;
            const newForecast = dailyWeather.map((element) => ({
                text: element.day.condition.text,
                icon: element.day.condition.icon,
                temperature: element.day.avgtemp_c,
            }))

            setForecast(newForecast);

        })
    }, [city])

  return (
    <div className={css.container}>
        <div className={css.forecast}>
            <div className={css.mainForecast}>
                <img className={css.img} src={currentWeather.icon} />
                <div className={css.miniForecast}>
                    <div>
                        <div><h2>{currentWeather.city}, <br/> {currentWeather.country}</h2></div>
                        <div><p className={css.desc}>{currentWeather.condition}</p></div>
                    </div>
                    <div className={css.degree}>{currentWeather.temperature}<sup>o</sup></div>
                </div>
            </div>
            <Swiper
                slidesPerView={3}
                spaceBetween={30}
                freeMode={true}
                // loop={true}
                autoplay={{ delay: 2500, disableOnInteraction: false }}
                pagination={{ el: ".swiper-pagination", clickable: true }}
                modules={[FreeMode, Pagination, Autoplay]}
                className={css.mySwiper}
            >
                {forecast.map((day, index) => (
                    <SwiperSlide key={index} className={css.swiperSlide}>
                        <div className={css.swiperContainer}>
                            <div className={css.swiperMini1}>
                                <img className={css.icon} src={day?.icon} />
                                <div className={css.insideDivTemp}>{day?.temperature} <sup>o</sup></div>
                                
                            </div>
                            <div className={css.swiperMini2}>
                                <div><h6 className={css.h6}>{["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"][index]}</h6></div>
                                <div><p className={css.desc2}>{day?.text}</p></div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
        <div className={css.todayForecast}>
            <div>
                <h4 className={css.h4}>Today's Highlights</h4>
            </div>
            <div>
                <TodayWeatherInfo 
                    feelsLike = {currentWeather.feelsLike} 
                    uv = {currentWeather.uv}
                    cloud = {currentWeather.cloud}
                    humidity = {currentWeather.humidity}
                    visibility = {currentWeather.visibility}
                    wind = {currentWeather.wind}
                />
            </div>
        </div>
    </div> 
  )
}
