import { useEffect, useState } from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import useWorkoutContext from "../hooks/useWorkoutContext";  // Custom Hooks
import useAuthContext from "../hooks/useAuthContext";

const Home = () => {

    const { workouts, dispatch } = useWorkoutContext();
    const { user } = useAuthContext();

    useEffect(()=> {

        const fetchWorkouts = async () => {
            const response = await fetch("http://localhost:3500/api/workout/", {
                headers: {
                    "Authorization": `Bearer ${user.token}`
                }
            });
            const json = await response.json()

            if (response.ok) {
                dispatch({type: "SET_WORKOUTS", payload: json})  // Because the whole json object also has the message attached to it as well
            }
        }

        if (user) {
            fetchWorkouts()
        }

    }, [dispatch, user])  

    return (    
        <>
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout) => (  // Round brackets have implicit return and curly braces have explicit return
                    <WorkoutDetails key={workout._id} workout={workout}/>  // Otherwise, it will return undefined. Use return with curly braces
                ))}
            </div>
            <WorkoutForm/>
        </div>
        </>
     );
}
 
export default Home;