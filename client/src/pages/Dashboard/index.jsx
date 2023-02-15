import React, { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar';
import SleepBarChart from '../../components/Charts/SleepBarChart';
import './dashboard.css';

const Dashboard = () => {
    useEffect(() => {
        fetchItems();
    }, []);

    const [items, setItems] = useState([]);

    const fetchItems = async () => {
        const data = await fetch('/dashboard');
        const items = await data.json();
        setItems(items);
    };

    return (
        <section className="dashboard">
            <NavBar />
            <div className="content">
                {items.map(item => (
                    <div key={item.id}>
                        <p>{item.name}</p>
                        <p>{item.msg}</p>
                    </div>
                ))}
            </div>
            <div className="chart">
                <SleepBarChart />
            </div>
        </section>
    );
};

export default Dashboard;
