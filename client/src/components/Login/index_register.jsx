import React, { useState } from "react"
export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    // This will need to be modified to send data to the back-end/Database
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }

    return(
        <div className="auth-form-container">
            <form onSubmit={handleSubmit}>
                <label htlmfor="name">Full Name</label>
                <input value={name} name="name" id="name" placeholder="Full Name" />
                <label htlmfor="email">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="myemailaddress@gmail.com" id="email" name="email" />
                <label htlmfor="password">Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                <button type="submit">Log In</button>
            </form>
            <button onClick={() => props.onFormSwitch('login')}>Already have an account? Login here</button>
        </div>
    )
}
