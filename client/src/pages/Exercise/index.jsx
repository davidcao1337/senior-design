import React, {useEffect, useState} from 'react';
import './exercise.css';
import NavBar from '../../components/NavBar';

const Exercise = () => {
    useEffect( ()=> {
        fetchItems();
    }, []);

    const [items, setItems] = useState([]);

    const fetchItems = async() => {
        const data = await fetch('/exercise');
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

export default Exercise;