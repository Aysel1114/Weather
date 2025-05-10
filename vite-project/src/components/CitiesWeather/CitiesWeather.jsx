import React from 'react';
import css from './CitiesWeather.module.css';

export default function CitiesWeather({ favouriteCities, onRemoveFavourite, setResult  }) {

    return (
        <div className={css.container}>
            <div className={css.cities}>
                <div className={css.inside}>
                    {favouriteCities.length === 0 ? (
                        <p>No favorite cities added.</p>
                    ) : (
                        favouriteCities.map((cityData, index) => (
                            <div key={index} className={css.city} onClick={() => setResult(cityData.city)}>
                                <div className={css.cardDesc}>
                                    <img className={css.icon} src={cityData.icon} alt={cityData.text} />
                                    <div>
                                        <div>{cityData.city}</div>
                                        <p className={css.p}>{cityData.text}</p>
                                        <p className={css.p}>
                                            High: {cityData.maxTemp}<sup>o</sup> Low: {cityData.minTemp}<sup>o</sup>
                                        </p>
                                    </div>
                                </div>
                                <div>{cityData.avgTemp}<sup>o</sup></div>
                                <button className={css.deleteButton} onClick={() => onRemoveFavourite(cityData.city)}>
                                    <img className={css.deleteImg} src="https://i.postimg.cc/15K2FWhT/delete-1.png" alt="Delete" />
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
