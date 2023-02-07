import React, {useEffect, useState} from 'react';
import NavBar from '../NavBar';
import './diet.css';
import Popup from 'reactjs-popup';
import DiaryEntry from './diary';

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

    // const { logout } = useLogout();

    const handleClick = () => {
      console.log('test');
    }

    return (
        <section>
            <NavBar />
            <content>
            <titleContainer>
                <div>Nutrition</div>
            </titleContainer>
            <foodLogContainer>
                <foodLogSection>

                </foodLogSection>
                <addFood>
                    <Popup trigger={<button> Click to add food </button>} position="left center">
                        <DiaryEntry />
                    </Popup>
                </addFood>
            </foodLogContainer>
                {
                    items.map(item => (
                        <div>
                            <p>{item.name}</p>
                            <p>{item.msg}</p>
                        </div>
                    ))
                }
            <addFood>
                <Popup trigger={<button> Click to add food </button>} position="right center">
                    <DiaryEntry />
                </Popup>
            </addFood>
            </content>
            <rightBar></rightBar>

        </section>
    );
}

export default Diet;