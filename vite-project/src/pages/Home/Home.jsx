import React, { useEffect, useState } from 'react'
import css from './Home.module.css';
import Navbar from '../../components/Navbar/Navbar';
import { Swiper } from 'swiper/react';
import { SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { useNavigate } from 'react-router';

export default function Home() {

    const [weatherData, setWeatherData] = useState([]);
    const newApi = "f3ca14bfb18a4cdca5f120532251203";
    const cities = ["London", "New York", "Tokyo", "Baku", "Paris", "Berlin", "Madrid", "Moscow", "Dubai", "Toronto"];
    const navigate = useNavigate();

    useEffect(() => {
        let selectedCities = [];
        while (selectedCities.length < 5) {
          let city = cities[Math.floor(Math.random() * cities.length)];
          if (!selectedCities.includes(city)) selectedCities.push(city);
        }
    
        let requests = selectedCities.map((city) =>
          fetch(`https://api.weatherapi.com/v1/forecast.json?key=${newApi}&q=${city}&days=3`)
            .then((response) => response.json())
            .then((data) => ({
              name: city,
              temp: data.current.temp_c,
              condition: data.current.condition.text,
              sunrise: data.forecast.forecastday[0].astro.sunrise,
              sunset: data.forecast.forecastday[0].astro.sunset,
              humidity: data.current.humidity,
              windspeed: data.current.wind_kph,
              forecast: data.forecast.forecastday.map((day) => ({
                date: day.date,
                temp: day.day.avgtemp_c,
                icon: day.day.condition.icon,
              })),
            }))
        );
    
        Promise.all(requests).then((results) => setWeatherData(results));
    }, []);

    const handleLogin = () => {
        navigate('/login');
    }

  return (
    <div className={css.container}>
        <div className={css.background}>
            <Navbar />
            <div className={css.overlay}></div>
            <div className={css.main}>
                <div className={css.firstSection}>
                    <h1 className={css.h1}>Climate Change <br/> Weather Forecast</h1>
                    <p className={css.p}>Get real-time weather forecasts and climate insights. <br/>
                        Stay informed about temperature changes, humidity, wind speed, <br/>
                        and sunrise/sunset times for your location.
                    </p>
                    <div className={css.signupContainer}>
                        <h2 className={css.signupTitle}>Join Us Today!</h2>
                        <p className={css.signupText}>Get personalized weather updates and climate change insights.</p>
                        <button onClick={handleLogin} className={css.signupButton}>
                            <img src="https://i.postimg.cc/y62F7Rfb/add-friend.png" alt="user icon" className={css.icon} />
                            Sign Up Now
                        </button>
                    </div>
                </div>
                <div className={css.secondSection}>
                    <Swiper effect={"cards"} grabCursor={true} modules={[EffectCards]} className={css.mySwiper}>
                        {weatherData.map((weather, index) => (
                                <SwiperSlide key={index} className={css.swiperSlide}>
                                    <div className={css.firstPart}>
                                      <div>
                                        <img className={css.swiperImg} src={weather.forecast[0].icon} alt="Weather Icon" />
                                      </div>
                                      <div>
                                        <div>{weather.name}</div>
                                        <div>{weather.condition}</div>
                                      </div>
                                      <div>{weather.temp} <sup>0</sup>C</div>
                                    </div>
                                    <hr />
                                    <div className={css.secondPart}>
                                      <div>
                                        <div className={css.second}>
                                          <img className={css.swiperImg} src="https://i.postimg.cc/sxFV8TTy/sunshine.png" />
                                          <div className={css.text}>Sunrise <br /> {weather.sunrise} </div>
                                        </div>
                                        <div className={css.second}>
                                          <img className={css.swiperImg} src="https://i.postimg.cc/xTfrCrJh/rainy-day_(1).png" />
                                          <div className={css.text}>Humidity <br /> {weather.humidity}% </div>
                                        </div>
                                      </div>
                                      <div>
                                        <div className={css.second}>
                                          <img className={css.swiperImg} src="https://i.postimg.cc/85vGhhNY/sunset.png" />
                                          <div className={css.text}>Sunset <br /> {weather.sunset} </div>
                                        </div>
                                        <div className={css.second}>
                                          <img className={css.swiperImg} src="https://i.postimg.cc/x1ZBtcxV/wind.png" />
                                          <div className={css.text}>WindSpeed <br /> {weather.windspeed} km/h </div>
                                        </div>
                                      </div>
                                    </div>
                                    <hr />
                                    <div className={css.lastPart}>
                                      {weather.forecast.map((day, idx) => (
                                        <div key={idx} className={css.last}>
                                    <div>{new Date(day.date).toLocaleDateString("en-US", { weekday: "short" })}</div>
                                    <img className={css.swiperImg} src={day.icon} alt="Forecast Icon" />
                                    <div>{day.temp} <sup>0</sup>C</div>
                                </div>
                            ))}
                            </div>
                        </SwiperSlide>
                    ))}
                    </Swiper>
                </div>
            </div>
        </div>
    </div>
  )
}
