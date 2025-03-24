import { WorkoutContext } from "../context/workoutContext";
import { useContext } from "react";

const useWorkoutContext = () => {

    const context = useContext(WorkoutContext); // This hook returns to us the value of this context which is the value passed in the provider component, state and dispatch giving context variable those values.
    
    if (!context) {  // A context provider wraps a component tree it wants to provide context value to. In case, useWorkoutContext is used anywhere outside the component tree, the context provider encloses (in our case, it is the whole application but it could just a sub-component), then we throw an error. Because the context outside would then be null. Instead of returning null, we return an error.
        throw Error("useWorkoutContext must be  used inside a WorkoutContextProvider");
    }
    return context;
}
 
export default useWorkoutContext;