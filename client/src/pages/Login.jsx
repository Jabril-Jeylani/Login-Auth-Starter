import axios from 'axios'

import { useState } from "react";
import { useNavigate } from "react-router-dom";

let emptyForm = { 
    username: '',
    password: '',
    email: ''
}

function Login({ setUser }) {

    const navigate = useNavigate()

    let [form, setForm] = useState(emptyForm)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            const loginToken = await axios.post('/auth/login', form)
            console.log(loginToken.data.token)
            localStorage.setItem('loginToken', loginToken.data.token)
        } catch (err) {
            console.log(err.message)
        }
    }

    return ( 
        <>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <br />
                <input 
                    type="text" 
                    id="username"
                    name="username"
                    onChange={handleChange}
                    value={form.username}
                />
                <br /><br />
                <label htmlFor="password">Password:</label>
                <br />
                <input 
                    type="password" 
                    id="password"
                    name="password"
                    onChange={handleChange}
                    value={form.password}
                />
                <br /><br />
                <button>Submit</button>
            </form>
        </>
     );
}

export default Login;