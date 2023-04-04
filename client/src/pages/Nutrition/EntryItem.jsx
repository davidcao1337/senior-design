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
            <div className='entryContent'>
                <div className='entryTitle'>{item.itemName}</div>
                <div className='entryStat'>
                    <div className='entryCategory'>Servings Eaten: </div>
                    <div className='entryInfo'>{item.servingsEaten}</div>
                </div>
                <div className='entryStat'>
                    <div className='entryCategory'>Calories Eaten: </div>
                    <div className='entryInfo'>{item.caloriesPerServing * item.servingsEaten}</div>
                </div>
                <div className='entryStat'>
                    <div className='entryCategory'>Protein Eaten (g): </div>
                    <div className='entryInfo'>{item.proteinPerServing * item.servingsEaten }</div>
                </div>
                <div className='entryStat'>
                    <div className='entryCategory'>Carbs Eaten (g): </div>
                    <div className='entryInfo'>{item.carbsPerServing * item.servingsEaten}</div>
                </div>
                <div className='entryStat'>
                    <div className='entryCategory'>Fat Eaten (g): </div>
                    <div className='entryInfo'>{item.fatPerServing * item.servingsEaten}</div>
                </div>
            </div>
            <span onClick={handleClick}><FontAwesomeIcon icon={faTrashCan} size="1x"></FontAwesomeIcon></span>
        </div>
    )
}

export default ProcessEntry;