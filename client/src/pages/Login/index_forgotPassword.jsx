import React from "react"
import { useNavigate } from "react-router-dom"
import lyfeonLogo from '../../assets/lyfeon-green.png'
import './login.css'

export const ForgotPassword = () => {

    let navigate = useNavigate();
    const routeChange = () =>{
        let path = '/login'
        navigate(path);
    }

    return(
        <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
            <img className="mt-24 mb-10" src={lyfeonLogo} alt="" width="230" height="69" />
            <h2 className="mb-10 font-bold text-3xl text-[#525252]">Forgot Password?</h2>
            <div className="message-container w-1/4">
                <p>Please contact customer support to recover your acccount</p>
                <div className="mt-24">
                    <p className="text-[#828282]">Want to head back?</p>
                    <button className="text-semibold text-lyfeon-green" onClick={routeChange}>Return to login page</button>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword