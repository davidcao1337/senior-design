import React, { useState } from "react"
import lyfeonLogo from '../../assets/lyfeon-green.png'
import './login.css'
import { useNavigate } from "react-router-dom"
import { useLogin } from "../../hooks/useLogin"

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {login, error, isLoading} = useLogin();

    let navigate = useNavigate();
    const routeChange = () => {
        let path = '/register'
        navigate(path);
    }
    const navigateForgot = () => {
        let path = '/forgot-password'
        navigate(path)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        await login(email, password);
    }

    return(
        <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
            <img className="mt-24 mb-10" src={lyfeonLogo} alt="" width="230" height="69" />
            <h2 className="mb-10 font-bold text-3xl text-[#525252]">Login to your Account</h2>
            <div className="auth-form-container w-1/4">
                <form onSubmit={handleSubmit}>
                    <div className="email-container text-left text-[#828282]">
                        <label className="font-semibold" htlmfor="email">Email</label>
                        <input className="mb-6 border-2 w-full rounded-[5px] px-2 py-2" value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" name="email" />
                    </div>
                    <div className="password-container text-left text-[#828282]"> 
                        <label className="font-semibold" htlmfor="password">Password</label>
                        <input className="border-2 w-full rounded-[5px] px-2 py-2" value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" name="password" />
                    </div>
                    <div>
                        <div className="remember-container flex flex-row float-left space-x-1">
                            <input className="accent-lyfeon-green checked:checkmark-white" type="checkbox" />
                            <p className="text-[#A1A1A1]">Remember Me</p>
                        </div>
                        <button className="float-right text-semibold text-lyfeon-green" onClick={navigateForgot}>Forgot Password?</button>
                    </div>
                    <button className="mt-10 mb-24 w-full font-extrabold text-lg text-white bg-lyfeon-green rounded-[6px] px-16 py-3" type="submit" disabled={isLoading}>Log In</button>
                    {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">{error}</div>}
                </form>
                <div className="mt-24">
                    <p className="text-[#828282]">Not registered yet?</p>
                    <button className="text-semibold text-lyfeon-green" onClick={routeChange}>Create an account</button>
                </div>
            </div>
        </div>
    )
}
