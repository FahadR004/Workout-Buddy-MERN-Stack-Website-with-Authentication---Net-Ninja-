import { createContext, useReducer } from "react";  // Lets us create new context which we can provide to our application

export const WorkoutContext = createContext(); // Creates brand new context

export const workoutsReducer = (state, action) => { // state here defines the previous state before updation/ current state ig. action is defined below
    switch (action.type) {
        case "SET_WORKOUTS": 
            return {
                workouts : action.payload   
            }

        case "CREATE_WORKOUTS": 
            return {
                workouts: [action.payload, ...state.workouts] // action.payload will be a single new workout object and to get the rest of the workouts, we use spread operator on the current/previous state's workouts to merge and create a final array of all workout objects
            }

        case "DELETE_WORKOUTS":
            return {
                workouts: state.workouts.filter((w) => w._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const WorkoutContextProvider = ({children}) => {  // Regular react component that will wrap the rest of our application

    const [state, dispatch] = useReducer(workoutsReducer, {
        workouts : null
    })

    // dispatch({type: "SET_WORKOUT", payload: [{}, {  }]}) // To change the state, call the dispatch function. Object as argument.
    //  First property would be type describing the state change in capital letters. 
    // Second property is in our case, an array of workout objects meaning it will have the data used to change the state
    // Argument of dispatch is called action and dispatch is invoked as above.
    return (
        <>
            <WorkoutContext.Provider value={{...state, dispatch}}>   
                { children }
            </WorkoutContext.Provider>
        </>
    )
}

// WorkoutContext.Provider is the component given to us by the context we created 
// value={{state, dispatch}} so that anyone can use the state value and dispatch function when needed.
// ...state is basically state.workouts