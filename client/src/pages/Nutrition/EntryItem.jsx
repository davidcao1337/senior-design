import { useFoodItemContext } from '../../hooks/useFoodItemContext';
import { useAuthContext } from '../../hooks/useAuthContext';
import './nutrition.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

const ProcessEntry =({ item }) => {
    const { dispatch } = useFoodItemContext();
    const { user } = useAuthContext();
    
    const handleClick = async() => {
        if(!user){
            return
        }
        const response = await fetch('/nutrition/' + item._id, {
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
        <div className="entry">
            <div>{item.itemName}</div>
            <div>{item.servingsEaten}</div>
            <div>{item.caloriesPerServing * item.servingsEaten}</div>
            <span onClick={handleClick}><FontAwesomeIcon icon={faTrashCan} size="1x"></FontAwesomeIcon></span>
        </div>
    )
}

export default ProcessEntry;