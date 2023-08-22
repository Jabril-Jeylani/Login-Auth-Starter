import axios from 'axios'

import { useState, useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";

import './App.css'


function App() {

    const [user, setUser] = useState({})

    const navigate = useNavigate()

    const token = localStorage.getItem('loginToken')

    async function retrieveUser() {
        try {
            
            const header = await axios.get('/api/users', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(header.data)
            setUser(header.data)
            navigate('/profile')
        } catch (err) {
            console.log(err.message)
        }
        
    }

    useEffect(() => {
        retrieveUser()
    }, [])
    console.log(user.username)
    return ( 
        <div className="app">
            <Navbar username={user.username} setUser={setUser} />
            <Routes>
                <Route path="/" element={<Home />} />
                
                { 
                user.username  ?
                <Route path="/profile" element={<Profile 
                username={user.username} 
                email={user.email} />} 
                /> : 
                <Route path="*" element={<Navigate to="/login" />} />
                }
                { !user.username ?
                <Route path="/login" element={<Login setUser={setUser} />} /> :
                <Route path="/" element={<Navigate to="/" />} />
                }
                { !user.username ?
                <Route path="/register" element={<Register setUser={setUser} />} /> :
                <Route path="/" element={<Navigate to="/" />} />
                }
                
            </Routes>
        </div>
     );
}

export default App;