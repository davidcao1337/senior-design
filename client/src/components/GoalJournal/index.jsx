import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faPlus, faTrophy } from '@fortawesome/free-solid-svg-icons';

const GoalJournal = () => {
    return (
        <div className="goals-container card bg-base-100">
            <div className="card-body">
                <div className="card-title mb-2 flex flex-row justify-center">
                    <h2>Goals</h2>
                </div>
                <div className="goal-cards flex flex-col space-y-8">
                    <div className="card border border-gray-300">
                        <div className="card-body">
                            <div className="flex flex-row">
                                <FontAwesomeIcon className="mr-5" icon={faTrophy} size="2x" />
                                <p>Goal Text</p>
                                <div className="ml-20 mr-20" />
                                <button className="ml-20"><FontAwesomeIcon icon={faEllipsisVertical} /></button>
                            </div>
                        </div>
                    </div>
                    <div className="card border border-gray-300 border-dashed">
                        <div className="card-body">
                            <button>
                                <span className="flex flex-row">
                                    <FontAwesomeIcon icon={faPlus} size="2x" />
                                    <p className="text-[#748AA1]">Add Goal</p>
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