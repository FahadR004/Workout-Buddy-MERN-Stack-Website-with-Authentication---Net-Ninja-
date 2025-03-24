import { useState } from "react";
import useWorkoutContext from "../hooks/useWorkoutContext";  // Custom Hook
import useAuthContext from "../hooks/useAuthContext";

const WorkoutForm = () => {
    const { dispatch } = useWorkoutContext();
    const { user } = useAuthContext();

    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [reps, setReps] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!user) {
            setError("You must be logged in!");
            return
        }

        const workout = {title, reps, load}

        const response  = await fetch('http://localhost:3500/api/workout/', {
            method: "POST",
            body: JSON.stringify(workout),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.token}`
            }
        });

        const json = await response.json();

        if (!response.ok) {
            setError(json.error)  // The backend api returns error key with error message
            setEmptyFields(json.emptyFields);
        }

        if (response.ok) {
            setTitle('');
            setReps('');
            setLoad('');
            setError(null);
            setEmptyFields([]);
            dispatch({type: 'CREATE_WORKOUTS', payload: json})
        }
        
    }
    return (  
        <>
            <form className="create" onSubmit={submitHandler}>
                <h3>
                    Add a New Workout!
                </h3>

                <label htmlFor="title-input">Workout Title
                <input 
                    id="title-input"
                    type="text" 
                    onChange={(e) => {setTitle(e.target.value)}}
                    value = {title}
                    className= {emptyFields.includes("title") ? "error" : ""}
                />
                </label>
                

                <label htmlFor="load-input">Load (in kg)
                    <input 
                    id="load-input"
                    type="number" 
                    onChange={(e) => {setLoad(e.target.value)}}
                    value = {load}
                    className= {emptyFields.includes("load") ? "error" : ""}
                /></label>
                

                <label htmlFor="reps-input">Reps</label>
                <input 
                    id="reps-label"
                    type="number" 
                    onChange={(e) => {setReps(e.target.value)}}
                    value = {reps}
                    className= {emptyFields.includes("reps") ? "error" : ""}
                />

                <button>Add Workout</button>
                {error && <div className="error">{error}</div>}
            </form>
        </>
    );
}
 
export default WorkoutForm;