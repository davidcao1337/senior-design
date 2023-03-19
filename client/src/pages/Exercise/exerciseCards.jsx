import { useExerciseContext } from '../../hooks/useExerciseChart';
import './exercise.css';

const ExerciseCards =({ exercise }) => {
    const { dispatch } = useExerciseContext()
    const handleClick = async() => {
        const response = await fetch('/exercise/' + exercise._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if(response.ok) {
            dispatch({type: 'DELETE_EXERCISE', payload: json})
        }
    }
    return (
        <div className="exercise-cards">
            <h4>{exercise.exerciseType}</h4>
            <p><strong>Type: </strong>{exercise.type}</p>
            <p><strong>Date: </strong>{new Date(exercise.date).toISOString().split("T")[0]}</p>
            <p><strong>Time (mins): </strong>{exercise.time}</p>
            {exercise.distance && (
                <p>
                <strong>Distance (km): </strong>
                {exercise.distance}
                </p>
            )}
            {exercise.loadWeight && (
                <p>
                <strong>Load Weight (kg): </strong>
                {exercise.loadWeight}
                </p>
            )}
            {exercise.sets && (
                <p>
                <strong>Sets: </strong>
                {exercise.sets}
                </p>
            )}
            {exercise.reps && (
                <p>
                <strong>Reps: </strong>
                {exercise.reps}
                </p>
            )}
            <p><strong>Calories: </strong>{exercise.calorie}</p>
            <span onClick={handleClick}>Delete</span>
        </div>
    )
}

export default ExerciseCards;