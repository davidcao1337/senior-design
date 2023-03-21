import React, { useState } from "react"
import lyfeonLogo from '../../assets/lyfeon-green.png'
import './login.css'
import { useNavigate } from "react-router-dom"
import { useRegister } from "../../hooks/useRegister"

export const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const {register, error, isLoading} = useRegister();

    let navigate = useNavigate();
    const routeChange = () =>{
        let path = '/login'
        navigate(path);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        await register(name, email, password);
    }

    return(
        <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
            <img className="mt-24 mb-10" src={lyfeonLogo} alt="" width="230" height="69" />
            <h2 className="mb-5 font-bold text-3xl text-[#525252]">Sign Up for an Account</h2>
            <div className="auth-form-container w-1/4">
                <form onSubmit={handleSubmit}>
                    <div className="name-container text-left text-[#828282]">
                        <label className="font-semibold" htlmfor="name">Full Name</label>
                        <input className="mb-6 border-2 w-full rounded-[5px] px-2 py-2" value={name} onChange={(e) => setName(e.target.value)} id="name" name="name" />
                    </div>
                    <div className="email-container text-left text-[#828282]">
                        <label className="font-semibold" htlmfor="email">Email</label>
                        <input className="mb-6 border-2 w-full rounded-[5px] px-2 py-2" value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" name="email" />
                    </div>
                    <div className="password-container text-left text-[#828282]">
                        <label className="font-semibold" htlmfor="password">Password</label>
                        <input className="border-2 w-full rounded-[5px] px-2 py-2" value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" name="password" />
                    </div>
                    <button className="mt-10 mb-24 w-full font-extrabold text-lg text-white bg-lyfeon-green rounded-[6px] px-16 py-3" type="submit" disabled={isLoading}>Register</button>
                    {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">{error}</div>}
                </form>
                <div className="mt-24">
                    <p className="text-[#828282]">Already have an account?</p>
                    <button className="text-semibold text-lyfeon-green" onClick={routeChange}>Sign in here</button>
                </div>
            </div>
        </div>
    )
}
