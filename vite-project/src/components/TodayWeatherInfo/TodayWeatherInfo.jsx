import React from 'react';
import css from './TodayWeatherInfo.module.css';

export default function TodayWeatherInfo({feelsLike, uv, cloud, humidity, visibility, wind}) {
  return (
    <div className={css.today}>
        <div className={css.miniCards}>
            <div className={css.miniCard}>
                <div className={css.cardDesc}>
                    <div>
                        <img className={css.icon} src = "https://i.postimg.cc/j5Xm8BCr/compass.png" />
                    </div>
                    <div>
                        <div>Feel Like</div>
                    </div>
                </div>
                <div>{feelsLike} <sup>o</sup></div>
            </div>
            <div className={css.miniCard}>
                <div className={css.cardDesc}>
                    <div>
                        <img className={css.icon} src = "https://i.postimg.cc/44bQjkbj/humidity.png" />
                    </div>
                    <div>
                        <div>Humidity</div>
                    </div>
                </div>
                <div>{cloud}%</div>
            </div>
        </div>
        <div className={css.miniCards}>
            <div className={css.miniCard}>
                <div className={css.cardDesc}>
                    <div>
                        <img className={css.icon} src = "https://i.postimg.cc/0jfGSDy9/cloud-1.png" />
                    </div>
                    <div>
                        <div>Cloud</div>
                    </div>
                </div>
                <div>{cloud} <sup>o</sup></div>
            </div>
            <div className={css.miniCard}>
                <div className={css.cardDesc}>
                    <div>
                        <img className={css.icon} src = "https://i.postimg.cc/1XPc4JPW/uv.png" />
                    </div>
                    <div>
                        <div>Ultraviolet</div>
                    </div>
                </div>
                <div>{uv}</div>
            </div>
        </div>
        <div className={css.miniCards}>
            <div className={css.miniCard}>
                <div className={css.cardDesc}>
                    <div>
                        <img className={css.icon} src = "https://i.postimg.cc/63Cf9Ds2/view.png" />
                    </div>
                    <div>
                        <div>Visibility</div>
                    </div>
                </div>
                <div>{visibility}</div>
            </div>
            <div className={css.miniCard}>
                <div className={css.cardDesc}>
                    <div>
                        <img className={css.icon} src = "https://i.postimg.cc/8C2bgTYg/windy.png" />
                    </div>
                    <div>
                        <div>Wind</div>
                    </div>
                </div>
                <div>{wind} km/h</div>
            </div>
        </div>
    </div>
  )
}
