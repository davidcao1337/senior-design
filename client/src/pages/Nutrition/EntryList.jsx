import React, {useEffect, useState} from 'react';
import { useFoodItemContext } from '../../hooks/useFoodItemContext';
import { useAuthContext } from '../../hooks/useAuthContext';
import ProcessEntry from './EntryItem';
import './nutrition.css';

export default function FoodEntryList( foodEntries ) {
  const { dispatch } = useFoodItemContext();
  const { user } = useAuthContext();

  const handleClick = async( props ) => {
    let target = props.currentTarget
    if(!user){
        return
    }
    const response = await fetch('/nutrition/' + props._id, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${user.token}`
        }
    });
    const json = await response.json()

    if(response.ok) {
        dispatch({type: 'DELETE_FOOD', payload: json})
    }
  }

  return (
    <div className='entryContents'>
      {foodEntries.listItems.map(( item ) => (
          <ProcessEntry key={item._id} item={item} />
      ))}
      </div>
    );
}