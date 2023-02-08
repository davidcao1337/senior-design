import React, {useEffect, useState} from 'react';
import NavBar from '../../components/NavBar';
import './nutrition.css';
import Popup from 'reactjs-popup';
import DiaryEntry from './diary';

const Nutrition = () => {
    useEffect( ()=> {
        fetchItems();
    }, []);

    const [items, setItems] = useState([]);

    const fetchItems = async() => {
        const data = await fetch('/nutrition');
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

export default Nutrition;