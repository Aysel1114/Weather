import React, { useEffect, useState } from 'react'
import css from './HourlySwiper.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Mousewheel, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css/bundle';

export default function HourlySwiper({city}) {

    const newApi = "7d6038628cdc44b5a44103754250405";
    const [hourlyUpdate, setHourlyUpdate] = useState([]);

    useEffect(() => {
        fetch(`https://api.weatherapi.com/v1/forecast.json?key=${newApi}&q=${city}&hours=24`)
        .then(response => response.json())
        .then(data => {
            const todayForecast = data.forecast.forecastday[0].hour;

            const forecastData = todayForecast.map(hourData => ({
                icon: hourData.condition.icon,
                temp: hourData.temp_c,
                text: hourData.condition.text,
                humidity: hourData.humidity,
                wind: hourData.wind_kph,
                time: hourData.time.split(' ')[1],
            }))
            setHourlyUpdate(forecastData);
        })
        .catch(error => console.error("Xəta baş verdi:", error));
    }, [city])

  return (
    <div className={css.container}>
        <h4 className={css.h4}>Hourly Update</h4>
        <Swiper
            navigation = {true}
            slidesPerView={7}
            spaceBetween={10}
            modules={[Navigation, Autoplay, Pagination, Mousewheel, FreeMode]}
            className={css.mySwiper}
            freeMode = {true}
            mousewheel = {true}
        >
            {hourlyUpdate.map((data, index) => (
                <SwiperSlide key={index} className={css.swiperSlide}>
                    <div className={css.swiperContainer}>
                        <img className={css.conditionImg} src={data.icon} alt="icon" />
                        <div className={css.temp}>{data.temp} <sup>o</sup></div>
                        <div className={css.conditionText}>{data.text}</div>
                        <hr />
                        <div className={css.info}>
                            <div className={css.miniInfo}>
                                <img className={css.icon} src="https://i.postimg.cc/44bQjkbj/humidity.png" alt="icon" />
                                <div className={css.desc}>{data.humidity}%</div>
                            </div>
                            <hr className={css.insideHr} />
                            <div className={css.miniInfo}>
                                <img className={css.icon} src="https://i.postimg.cc/8C2bgTYg/windy.png" alt="icon" />
                                <div className={css.desc}>{data.wind} km/h</div>
                            </div>
                        </div>
                        <div className={css.conditionText}>{data.time}</div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    </div>
  )
}
