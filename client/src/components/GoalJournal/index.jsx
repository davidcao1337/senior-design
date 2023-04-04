import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useAuthContext } from '../../hooks/useAuthContext'
import { useGoalsContext } from '../../hooks/useGoalsContext'
import GoalDetails from './goalDetails'

const GoalJournal = (props) => {
    const { user } = useAuthContext()
    const { goals, dispatch } = useGoalsContext()

    const { toggleModalVisibility } = props

    useEffect(() => {
        const fetchGoals = async () => {
            const response = await fetch('/goals', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_GOALS', payload: json})
            }
        }

        if (user) {
            fetchGoals()
        }
    }, [user, dispatch])

    return (
        <div className="goals-container card bg-base-100">
            <div className="card-body">
                <div className="card-title mb-2 flex flex-row justify-center">
                    <h2>Goals</h2>
                </div>
                <div className="goal-cards flex flex-col space-y-8">
                    {goals && goals.map((goal) => (
                        <GoalDetails key={goal._id} goal={goal} />
                    ))}
                    <div className="card border border-gray-300 border-dashed">
                    <button className="card-body flex flex-row justify-center items-center" onClick={toggleModalVisibility}>
                        <div className="flex items-center">
                            <div className="w-8 flex justify-center">
                                <FontAwesomeIcon icon={faPlus} size="2x" />
                            </div>
                            <p className="text-[#748AA1] ml-2 mt-1">Add Goal</p>
                        </div>
                    </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GoalJournal