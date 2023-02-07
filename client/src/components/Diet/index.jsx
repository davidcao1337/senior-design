import React, {useEffect, useState} from 'react';
import NavBar from '../NavBar';
import './diet.css';

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
            <NavBar />
            <content>
            <titleContainer>
                <div>Nutrition</div>
            </titleContainer>
            <foodLogContainer>
                <foodLogSection>

                </foodLogSection>
                <foodLogSection>
                    
                </foodLogSection>
                <foodLogSection>
                    
                </foodLogSection>
                <foodLogSection>
                    
                </foodLogSection>
                

            </foodLogContainer>
                {
                    items.map(item => (
                        <div>
                            <p>{item.name}</p>
                            <p>{item.msg}</p>
                        </div>
                    ))
                }

            </content>
            <rightBar></rightBar>

        </section>
    );
}

export default Diet;