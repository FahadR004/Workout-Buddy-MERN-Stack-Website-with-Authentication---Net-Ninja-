import { useState } from "react";
import useSignup from "../hooks/useSignup";

const Signup = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signup, isLoading, error} = useSignup();

    const submitHandler = async (e) => {
        e.preventDefault();

        signup(email, password)

    }

    return ( 
        <>
            <form className="signup" onSubmit={submitHandler}>
                <h3>
                    Registration
                </h3>

                <label htmlFor="email-input">Email Address
                <input 
                    id="email-input"
                    type="text" 
                    onChange={(e) => {setEmail(e.target.value)}}
                    value = {email}
                />
                </label>
                
                <label htmlFor="password-input">Password
                    <input 
                    id="password-input"
                    type="password" 
                    onChange={(e) => {setPassword(e.target.value)}}
                    value = {password}
                /></label>

                <button disabled={isLoading} className="signup-btn">Sign up</button>
                {error && <div className="error">{error}</div>}
            </form>
        </>
     );
}
 
export default Signup;