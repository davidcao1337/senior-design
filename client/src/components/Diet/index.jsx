import React, {useEffect, useState} from 'react';

const Diet = () => {
    useEffect( ()=> {
        fetchItems();
    }, []);

    const [items, setItems] = useState([]);

    const fetchItems = async() => {
        const data = await fetch('/diet');
        const items = await data.json();
        setItems(items);
    };

    return (
        <section>
            {
                items.map(item => (
                    <div>
                        <p>{item.name}</p>
                        <p>{item.msg}</p>
                    </div>
                ))
            }
        </section>
    );
}

export default Diet;