import { useState } from "react";
import useLogin from "../hooks/useLogin";

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, error, isLoading } = useLogin();

    const submitHandler = async (e) => {
        e.preventDefault();
        await login(email, password);
        console.log(email, password);

    }

    return ( 
        <>
            <form className="login" onSubmit={submitHandler}>
                <h3>
                    Login Into Your Account
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

                <button disabled={isLoading} className="login-btn">Login</button>
                {error && <div className="error">{error}</div>}
            </form>
        </>
     );
}
 
export default Login;