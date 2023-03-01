import React, {useEffect, useState} from 'react';
import './nutrition.css';

export default function FoodEntryList( foodEntries ) {
    return (
      <div className='entryContents'>
        {foodEntries.listItems.map(( item ) => (
            <div className="entry" key={item.name}>
                <div>{item.name}</div>
                <div>{item.servings}</div>
                <div>{item.calories}</div>
            </div>
        ))}
      </div>
    );
}
