import React, { useEffect, useState } from 'react'
import Navbar2 from '../../components/Navbar2/Navbar2'
import Sidebar from '../../components/Sidebar/Sidebar'
import css from './WeatherNews.module.css';

export default function WeatherNews() {

    const [search, setSearch] = useState("");
    const [result, setResult] = useState("Baku");
    const [data, setData] = useState([]);

    const handleSearch = () => {
        setResult(search);
    };

    const newsApi = "307847ce4f4f4c49bce05662a192bcfd";
    const url = `https://newsapi.org/v2/everything?q=weather&apiKey=${newsApi}`;  
    useEffect(() => {
        fetch(url)
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            if (data.status === 'ok') {
                const articles = data.articles;
    
                setData(
                    data.articles.slice(0, 6).map(article => ({
                      title: article.title,
                      source: article.source.name,
                      url: article.url,
                      publishedAt: article.publishedAt,
                      image: article.urlToImage,
                      description: article.description
                    }))
                );
            }   else {
                console.error('Xəbər alınmadı:', data.message);
            }
        })
    }, [search])

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', options);
    };

    // console.log("data = " + data[1]?.title);

  return (
    <div className={css.container}>
        <div className={css.navbar}>
            <Navbar2 
                search={search}
                setSearch={setSearch}
                onSearch={handleSearch}
                currentWeather={{ city: 'Baku', country: 'Azerbaijan' }} 
            />
        </div>
        <div className={css.sidebar}>
            <Sidebar/>
        </div>
        <div className={css.content}>
            <div className={css.scrollableContent}>
                <div className={css.weatherNews}>
                    <div className={css.up}>
                        {data.slice(0, 3).map((article, index) => (
                          <div key={index} className={css.news}>
                            <div className={css.firstPart}>
                              <div>
                                <img className={css.img} src={article.image} alt={article.title} />
                              </div>
                              <div>
                                <a href={article.url} target="_blank" rel="noopener noreferrer">{article.title}</a>
                              </div>
                            </div>
                            <div className={css.lastPart}>
                              <div className={css.date}>
                                <img className={css.icon} src="https://i.postimg.cc/KvWWdtFK/calendar.png" alt="Calendar" />
                                {/* <p>{article.publishedAt}</p> */}
                                <p>{formatDate(article.publishedAt)}</p>
                              </div>
                              <a href={article.url} target="_blank" rel="noopener noreferrer">
                                <button className={css.button}>
                                    Read More <img className={css.icon} src="https://i.postimg.cc/bJzh3ZRg/next.png" alt="Next" />
                                </button>
                              </a>
                            </div>
                          </div>
                        ))}
                    </div>
                    <div className={css.down}>
                      {data.slice(3, 6).map((article, index) => (
                        <div key={index} className={css.news}>
                          <div className={css.firstPart}>
                            <div>
                              <img className={css.img} src={article.image} alt={article.title} />
                            </div>
                            <div>
                              <a href={article.url} target="_blank" rel="noopener noreferrer">{article.title}</a>
                            </div>
                          </div>
                          <div className={css.lastPart}>
                            <div className={css.date}>
                              <img className={css.icon} src="https://i.postimg.cc/KvWWdtFK/calendar.png" alt="Calendar" />
                              {/* <p>{article.publishedAt}</p> */}
                              <p>{formatDate(article.publishedAt)}</p>
                            </div>
                            <a href={article.url} target="_blank" rel="noopener noreferrer">
                                <button className={css.button}>
                                Read More <img className={css.icon} src="https://i.postimg.cc/bJzh3ZRg/next.png" alt="Next" />
                                </button>
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
