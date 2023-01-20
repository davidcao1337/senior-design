/*
import React, {useEffect, useState} from 'react';
import { Bar } from "react-chartjs-2";

const Sleep = () => {
    /*
    useEffect( ()=> {
        fetchItems();
    }, []);

    const [items, setItems] = useState([]);

    const fetchItems = async() => {
        const data = await fetch('/sleep');
        const items = await data.json();
        setItems(items);
    }; */

    return (
<<<<<<< Updated upstream
        <div className="Sleep">
          <h1>BAR CHART REACTJS</h1>
          <div style={{ maxWidth: "650px" }}>
            <Bar
              data={{
                // Name of the variables on x-axies for each bar
                labels: ["1st bar", "2nd bar", "3rd bar", "4th bar"],
                datasets: [
                  {
                    // Label for bars
                    label: "total count/value",
                    // Data or value of your each variable
                    data: [1552, 1319, 613, 1400],
                    // Color of each bar
                    backgroundColor: ["aqua", "green", "red", "yellow"],
                    // Border color of each bar
                    borderColor: ["aqua", "green", "red", "yellow"],
                    borderWidth: 0.5,
                  },
                ],
              }}
              // Height of graph
              height={400}
              options={{
                maintainAspectRatio: false,
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        // The y-axis value will start from zero
                        beginAtZero: true,
                      },
                    },
                  ],
                },
                legend: {
                  labels: {
                    fontSize: 15,
                  },
                },
              }}
            />
          </div>
        </div>
=======
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
>>>>>>> Stashed changes
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