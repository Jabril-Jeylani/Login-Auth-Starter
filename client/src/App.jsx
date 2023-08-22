import axios from 'axios'

import { useState, useEffect } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";

import './App.css'


function App() {

    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    const location = useLocation()
    console.log(location.pathname)

    async function retrieveUser() {
        try {
            const token = localStorage.getItem('loginToken')
            const header = await axios.get('/api/users', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(header.data)
            setUser(header.data)
            if (user.username) {
                setLoading(true)
            } 
            // if (!user) {
            //     navigate('/profile')
            // } else {
            //     navigate('/')
            // }
            
        } catch (err) {
            console.log(err.message)
        }
        
    }

    useEffect(() => {
        retrieveUser()
    }, [])

    
    console.log(loading)

    console.log(user.username)
    return ( 
        <div className="app">
            <Navbar username={user.username} setUser={setUser} />
            <Routes>
                <Route exact path="/" element={<Home />} />

                { 
                !user.username ?
                <>
                <Route path="/login" element={<Login setUser={setUser} />} /> 
                <Route path="/register" element={<Register setUser={setUser} />} />
                <Route path="*" element={<Navigate to="/login" />} />
                </> :
                <>
                <Route path="/profile" element={<Profile 
                    username={user.username} 
                    email={user.email} />} 
                />
                <Route path="*" element={<Navigate to="/" />} />
                </>
                }

                {/* { 
                !user.username ?
                <Route path="/register" element={<Register setUser={setUser} />} /> :
                <Route exact path="/" element={<Navigate to="/" />} />
                } */}

                {/* { 
                user.username && location.pathname === "/login" ?
                <Route path="/profile" element={<Profile 
                username={user.username} 
                email={user.email} />} 
                /> : 
                <Route path="*" element={<Navigate to="/login" />} />
                }
                 */}
                
                
                {/* { 
                user.username && location.pathname === "/login" ?
                <Route path="/profile" element={<Navigate to="/" />} 
                /> : 
                location.pathname === "/register" ?
                <Route path="/profile" element={<Navigate to="/" />} :
                <Route path="/profile" element={<Profile 
                    username={user.username} 
                    email={user.email} />} 
                    /> 
                } */}

               

            </Routes>
        </div>
     );
}

export default App;