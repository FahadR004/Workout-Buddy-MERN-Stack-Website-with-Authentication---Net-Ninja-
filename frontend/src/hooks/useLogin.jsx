import { useState } from "react";
import useAuthContext from "./useAuthContext";

const useLogin = () => {

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();

    // The function signup is not actually being called here anywhere. Just defined unlike in other templates where we call a function in it and define it above
    // All three things that we defined here, the function below and the useState variables above, we export them and import into the signup page

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null); 


        const response = await fetch('http://localhost:3500/api/auth/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email, password})
        })

        const json = await response.json();

        if (!response.ok) {
            setIsLoading(false);
            setError(json.error);
        }

        if (response.ok) {
            // save the user to local storage
            localStorage.setItem('user', JSON.stringify(json))  // Because we store strings in local storage
            // When user signs up, we send back email and token so we're saving that to the browser

            // update the context 
            dispatch({type: "LOGIN", payload: json})

            setIsLoading(false);
        }
    }
    return {
        login,
        isLoading,
        error
    };
}
 
export default useLogin;