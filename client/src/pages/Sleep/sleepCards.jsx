import { useSleepContext } from '../../hooks/useSleepContext';
import './sleep.css';
import { useAuthContext } from '../../hooks/useAuthContext';

const SleepCards =({ sleep }) => {
    const { dispatch } = useSleepContext();
    const { user } = useAuthContext();

    const handleClick = async() => {
        if(!user){
            return
        }
        const response = await fetch('/sleep/' + sleep._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        });
        const json = await response.json()

        if(response.ok) {
            dispatch({type: 'DELETE_SLEEP', payload: json})
        }
    }
    return (
        <div className="sleep-cards">
            <h4>{new Date(sleep.date).toISOString().split("T")[0]}</h4>
            <p>
                <strong>Sleep time: </strong>
                {sleep.hours} hrs {sleep.minutes} mins
            </p>
            <span onClick={handleClick}>Delete</span>
        </div>
    )
}

export default SleepCards;