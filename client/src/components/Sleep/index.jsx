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

import React, { useState } from "react"
import './sleep.css';
export const Sleep = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }

    return(
        <div className="flex flex-col items-left justify-left w-full flex-1 px-20 text-left">
            <h2 className="mb-5 font-bold text-3xl text-[#525252]">Sleep Tracking</h2>
            <div class="btn-group">
                <input type="radio" name="options" data-title="Day" class="btn" />
                <input type="radio" name="options" data-title="Week" class="btn" />
                <input type="radio" name="options" data-title="Month" class="btn" />
                <input type="radio" name="options" data-title="Year" class="btn" />
            </div>
        </div>
    )
}

export default Sleep;