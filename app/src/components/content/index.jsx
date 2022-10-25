import './index.css'
import axios from "axios"
import { useState } from "react";
import moment from "moment/moment";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrophy , faBars } from '@fortawesome/free-solid-svg-icons'

const Content = () => {

    const [Data, SetData] = useState([]);
    const [querry, SetQuerry] = useState("");
    const [isLoading, SetisLoading] = useState(false);

    // function getTrendingNews()


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

            <form onSubmit={getNews} >
                <div className='flex'>
                    <img className='micro' src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png" alt="logo" />
                    <p className="logo">Microsoft Bing</p>


                    <input type="text"
                        className='input'


                        onChange={(e) => {

                            SetQuerry

                                (e.target.value)
                        }
                        }
                    />
                    <button className='sign-in'>Sign in</button>
                    <p className='reward'>Rewards</p>
                    <FontAwesomeIcon className='icon , trophy' icon = {faTrophy} />
                    <FontAwesomeIcon className='icon' icon = {faBars} />

                   
                </div>
            </form>

            <div >
                {(isLoading) ? "loading.." : ""}

                {Data.map(eachPost => (

                    <div key={eachPost?.name}>

                        <a href={eachPost?.url}>{eachPost?.name}</a>

                        <span>{
                            moment(eachPost?.datePublished).format('MMMM Do YYYY , h:mm a')
                        }
                        </span>
                        <h3>{eachPost?.description}</h3>
                        <img src={eachPost?.image?.thumbnail?.contentUrl
                            .replace("&pid=News", "")
                            .replace("pid=News&", "")
                            .replace("pid=News", "")
                        }
                            alt="" />

                    </div>
                ))}

            </div>
        </div>
    )



}
export default Content