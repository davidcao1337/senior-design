/*
import React, {useEffect, useState} from 'react';

const Sleep = () => {
    useEffect( ()=> {
        fetchItems();
    }, []);

    const [items, setItems] = useState([]);

    const fetchItems = async() => {
        const data = await fetch('/sleep');
        const items = await data.json();
        setItems(items);
    };

    return (
        <section>
            <content>
            {
                items.map(item => (
                    <div>
                        <p>{item.name}</p>
                        <p>{item.msg}</p>
                    </div>
                ))
            }
            </content>
        </section>
    );
}

export default Sleep;
*/

import React, {useEffect, useState} from 'react';
import exampleChart from '../../assets/lineandbar_example.png';
import './sleep.css';
export const Sleep = (props) => {

    useEffect( ()=> {
        fetchItems();
    }, []);

    const [items, setItems] = useState([]);

    const fetchItems = async() => {
        const data = await fetch('/sleep');
        const items = await data.json();
        setItems(items);
    };

    return(
        <div className="flex flex-col items-left justify-left w-full flex-1 px-20 text-left">
            <h2 className="mb-5 font-bold text-3xl text-[#525252]">Sleep Tracking</h2>
            <div className="stats shadow">
            <div className="stat place-items-center">
                <div className="stat-title">Sleep Score</div>
                <div className="stat-value">78</div>
                <div className="stat-desc">Yesterday</div>
            </div>
            <div className="stat place-items-center">
                <div className="stat-title">Sleep Time</div>
                <div className="stat-value">8 h 15 min</div>
                <div className="stat-desc">↗︎ Sleep duration (8%)</div>
            </div>
            <div className="stat place-items-center">
                <div className="stat-title">Deep Sleep</div>
                <div className="stat-value">1 h 5 min</div>
                <div className="stat-desc">↘︎ Deep sleep duration(14%)</div>
            </div>
            </div>
            <div class="btn-group">
                <input type="radio" name="options" data-title="Day" class="btn" />
                <input type="radio" name="options" data-title="Week" class="btn" />
                <input type="radio" name="options" data-title="Month" class="btn" />
                <input type="radio" name="options" data-title="Year" class="btn" />
            </div>
            <img className="float-left" src={exampleChart} alt="" width="700" height="70" />
            <div className="alert alert-info shadow-lg">
                <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span>7 days average sleep time: 7 hours 22 minutes</span>
                </div>
            </div>
            <img className="float-left" src={exampleChart} alt="" width="700" height="70" />
        </div>
    )
}

export default Sleep;