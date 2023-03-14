import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell, faEllipsisVertical, faMoon, faPlus, faTrophy, faUtensils } from '@fortawesome/free-solid-svg-icons';

const GoalJournal = (props) => {

    const { toggleModalVisibility } = props
    const [goals, setGoals] = useState(null)

    useEffect(() => {
        const fetchGoals = async () => {
            const response = await fetch('/goals')
            const json = await response.json()

            if (response.ok) {
                setGoals(json)
            }
        }

        fetchGoals()
    }, [])

    return (
        <div className="goals-container card bg-base-100">
            <div className="card-body">
                <div className="card-title mb-2 flex flex-row justify-center">
                    <h2>Goals</h2>
                </div>
                <div className="goal-cards flex flex-col space-y-8">
                    {goals && goals.map((goal) => (
                        <div className="card border border-gray-300">
                            <div key={goal._id} className="card-body">
                                <div className="flex flex-row">
                                    <FontAwesomeIcon className="mr-5" size="2x" 
                                    icon={
                                        goal.goalType === 'exercise' ? faDumbbell
                                        : goal.goalType === 'nutrition' ? faUtensils
                                        : goal.goalType === 'sleep' ? faMoon
                                        : faTrophy
                                    }
                                    />
                                    <p>{goal.description}</p>
                                    <div className="ml-20 mr-20" />
                                    <button className="ml-20"><FontAwesomeIcon icon={faEllipsisVertical} /></button>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="card border border-gray-300 border-dashed">
                        <div className="card-body">
                            <button onClick={toggleModalVisibility}>
                                <span className="flex flex-row ml-20 mr-20 space-x-3">
                                    <FontAwesomeIcon icon={faPlus} size="2x" />
                                    <p className="text-[#748AA1] mt-1">Add Goal</p>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GoalJournal