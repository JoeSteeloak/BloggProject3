import { NavLink } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const Header = () => {
    const { user, logout } = useAuth();
    return (
        <header>
            <ul>
                <li><NavLink to="/">Start</NavLink></li>
                <li><NavLink to="/admin">Nytt inlägg</NavLink></li>
                <li>
                    {
                        !user ? <NavLink to="/login">Login</NavLink> : <button onClick={logout}>Logga ut</button>
                    }
                </li>
            </ul>
        </header>




    )
}

export default Header