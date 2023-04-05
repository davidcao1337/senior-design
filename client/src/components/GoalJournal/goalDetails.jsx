import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell, faEllipsisVertical, faMoon, faTrophy, faUtensils, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useGoalsContext } from '../../hooks/useGoalsContext';
import classnames from 'classnames';

const GoalDetails = ({ goal }) => {
    const { user } = useAuthContext()
    const { dispatch } = useGoalsContext()
    const [error, setError] = useState(null)

    const handleDelete = async (e) => {
        e.preventDefault()

        if (!user) {
            return
        }

        const response = await fetch('/goals/' + goal._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }

        if (response.ok) {
            dispatch({type: 'DELETE_GOAL', payload: json})
        }
    }

    return (
        <div className="card border border-gray-300">
            <div className="card-body">
                <div className="flex flex-row">
                    <FontAwesomeIcon 
                    className={classnames('mr-5', {
                        'text-[#e11d48]': goal.goalType === 'exercise',
                        'text-[#0284c7]': goal.goalType === 'nutrition',
                        'text-[#7c3aed]': goal.goalType === 'sleep',
                        'text-[#fcd34d]': goal.goalType === 'trophy',
                    })}
                    size="2x" 
                    icon={
                        goal.goalType === 'exercise' ? faDumbbell
                        : goal.goalType === 'nutrition' ? faUtensils
                        : goal.goalType === 'sleep' ? faMoon
                        : faTrophy
                    }
                    />
                    <p className="mt-1">{goal.description}</p>
                    <div className="ml-10 mr-10" />
                    <div className="dropdown dropdown-bottom dropdown-end">
                        <button tabIndex={0} className="ml-10"><FontAwesomeIcon icon={faEllipsisVertical} className="mt-1 fa-lg" /></button>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">       
                            <li><button onClick={handleDelete}><FontAwesomeIcon icon={faXmark} className="fa-lg" style={{color: "#ff1900"}}/>Delete</button></li>
                        </ul>
                    </div>
                </div>
            </div>
            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">{error}</div>}
        </div>
    )
}

export default GoalDetails