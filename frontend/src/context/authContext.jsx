import { createContext, useReducer, useEffect } from "react";
import { workoutsReducer } from "./workoutContext";

export const AuthContext = createContext();

// dispatch({type: "SET_WORKOUT", payload: [{}, {  }]}) // To change the state, call the dispatch function. Object as argument. Whole argument is called action

export const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN" :
            return {
                user: action.payload
            }

        case "LOGOUT": 
            return {
                user: null
            }

        default: 
            return state
    }
}

export const AuthContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    useEffect(() => {

        const user = JSON.parse(localStorage.getItem('user'));  // We parse because it is stored as a JSON string.

        if (user) {
            dispatch({type:"LOGIN", payload: user});
        }
    }, []) // We' re checking it once when the application is loading. Check for the token in localStorage just once.
    // When the AuthContextProvider renders, we're running the useEffect function just once.

    console.log('AuthContext state: ', state);

    return (
        <>
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
       </>
    )
}

// ...state in case we add more properties to it