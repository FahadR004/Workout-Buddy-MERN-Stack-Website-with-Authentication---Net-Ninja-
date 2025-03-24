import useAuthContext from "./useAuthContext";
import useWorkoutContext from "./useWorkoutContext";

export const useLogout = () => {  // We see our exercises for other users for a second before logging in, despite protecting the data from the 
// backend and retrieving only the data based on id because they're still stored in the global state of the React application.

    const { dispatch } = useAuthContext();
    const { dispatch : workoutsDispatch } = useWorkoutContext(); // Can't import two of the dispatches with the same name

    const logout = () => { // Don't really no need to send a request to the backend. Just remove user from localStorage and update the global state

        // remove user from storage
        localStorage.removeItem('user');

        // dispatch logout action
        dispatch({type: "LOGOUT"}) // Don't really need the payload because we are setting the user to null
        workoutsDispatch({type: "SET_WORKOUTS", payload: null})
    } 

    return {
        logout
    }
}   