import React, {useEffect, useState} from 'react';
import NavBar from '../../components/NavBar';
import './dashboard.css';

const Dashboard = () => {
    useEffect( ()=> {
        fetchItems();
    }, []);

    const [items, setItems] = useState([]);

    const fetchItems = async() => {
        const data = await fetch('/dashboard');
        const items = await data.json();
        setItems(items);
    };

    return (
        <section>
            <NavBar />
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

export default Dashboard;