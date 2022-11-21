import './index.css'
import axios from "axios"
import { useState, useEffect } from "react";
import moment from "moment/moment";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrophy, faBars } from '@fortawesome/free-solid-svg-icons'

const Content = () => {

    const [Data, SetData] = useState([]);
    const [querry, SetQuerry] = useState("");
    const [isLoading, SetisLoading] = useState(false);

    useEffect(() => {
        function getTrendingNews() {

            const options = {
                method: 'GET',
                url: 'https://bing-news-search1.p.rapidapi.com/news',
                params: { safeSearch: 'Off', textFormat: 'Raw' },
                headers: {
                    'X-BingApis-SDK': 'true',
                    'X-RapidAPI-Key': '5a036c0c2cmsh5fbf592e1385f18p1132e4jsne1e1cece2046',
                    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
                }
            };

            axios.request(options).then(function (response) {

                SetData(response.data.value)

            }).catch(function (error) {
                console.error(error);
            });
        }

        getTrendingNews();

    }, [])

    const getNews = (e) => {
        e.preventDefault();

        const options = {
            method: 'GET',
            url: 'https://bing-news-search1.p.rapidapi.com/news/search',
            params: { q: querry, freshness: 'Day', textFormat: 'Raw', safeSearch: 'Off' },
            headers: {
                'X-BingApis-SDK': 'true',
                'X-RapidAPI-Key': '5a036c0c2cmsh5fbf592e1385f18p1132e4jsne1e1cece2046',
                'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
            }
        };
        SetisLoading(true)
        axios.request(options).then(function (response) {
            SetisLoading(false)
            console.log(response.data.value);
            SetData(response.data.value)


        }).catch(function (error) {
            SetisLoading(false)
            console.error(error);
        });
    }
    return (

        <div>
            <div className='nav'>
                <form onSubmit={getNews} >
                    <div className='flex'>
                        <img className='micro' src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png" alt="logo" />
                        <p className="logo">Microsoft Bing</p>
                        <input type="text"
                            className='input' onChange={(e) => {
                                SetQuerry(e.target.value)
                            }} />
                        <button className='sign-in'>Sign in</button>
                        <p className='reward'>Rewards</p>
                        <FontAwesomeIcon className='icon , trophy' icon={faTrophy} />
                        <FontAwesomeIcon className='icon' icon={faBars} />


                    </div>
                </form>
            </div>

            <div className='main'>
                <div className='color'></div>
                <br /><br />

                <h1>Trending News</h1>

                {(isLoading) ? "loading.." : ""}


                {Data.map(eachPost => (

                    <div key={eachPost?.name} className="post">
                        <a className='link' href={eachPost?.url}>{eachPost?.name}</a>
                        <br />
                        
                        <span>{
                            moment(eachPost?.datePublished).format('MMMM Do YYYY , h:mm a')
                        }
                        </span>
                        <br /> <br />
                        <img src={eachPost?.image?.thumbnail?.contentUrl
                            .replace("&pid=News", "")
                            .replace("pid=News&", "")
                            .replace("pid=News", "")
                        }
                            alt="" />
                        <p>{eachPost?.description}</p>

                    </div>

                ))}


            </div>
        </div>
    )



}
export default Content