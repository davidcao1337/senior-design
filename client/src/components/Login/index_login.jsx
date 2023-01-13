import React, { useState } from "react"
import Logo from '../../assets/lyfeon-green.png'
import './login.css';
export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }

    return(
        <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
            <img src={Logo} alt="" width="230" height="69" />
            <h2>Login to your Account</h2>
            <button>Continue with Google</button>
            <p>---------- or Sign in with Email ----------</p>
            <div className="auth-form-container">
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htlmfor="email">Email</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="myemailaddress@gmail.com" id="email" name="email" />
                        <label htlmfor="password">Password</label>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                        </div>
                    <div>
                        <p><input type="checkbox" />Remember Me</p>
                        <button>Forgot Password?</button>
                    </div>
                    <button type="submit">Log In</button>
                </form>
                <button onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here</button>
            </div>
        </div>
    )
}
