import { AuthContext } from "../context/authContext";
import { useContext } from "react";

const useAuthContext = () => {

    const context = useContext(AuthContext);
    
    if (!context) {
        throw Error("useAuthContext cannot be used outside of the AuthContextProvider!")
    }

    return context;
}

export default useAuthContext;