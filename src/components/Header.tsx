import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Header.css";

const Header = () => {
    const { user, logout } = useAuth();

    return (
        <header>
            <nav>
                <ul className="nav-links">
                    <li><NavLink to="/">Start</NavLink></li>
                    {user && <li><NavLink to="/admin">Nytt inlägg</NavLink></li>}
                    <li>
                        {!user ? (
                            <NavLink to="/login">Logga in</NavLink>
                        ) : (
                            <button onClick={logout}>Logga ut</button>
                        )}
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;