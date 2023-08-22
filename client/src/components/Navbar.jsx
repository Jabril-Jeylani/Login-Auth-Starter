import { Link } from "react-router-dom";
import icon from '../assets/react.svg'

function Navbar({ username, setUser }) {
  
  const logout = () => {
    localStorage.removeItem('loginToken')
    setUser({})
  };

  return (
    <ul>
      <li>
        <Link to="/">
          <img src={icon} alt="React Icon" id="icon" />
        </Link>
      </li>
      {username ? 
        <>
          <li style={{ color: "black" }}>Welcome {username}!</li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li onClick={logout}>
            <Link to="/login">Logout</Link>
          </li>
        </>
       : 
        <>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </>
      }
    </ul>
  );
}

export default Navbar;
