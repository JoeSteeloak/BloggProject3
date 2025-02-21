import { NavLink } from "react-router-dom"

const Header = () => {
    return (
        <header>
            <ul>
                <li><NavLink to="/">Start</NavLink></li>
                <li><NavLink to="/Admin">Admin</NavLink></li>
                <li><NavLink to="/Login">Login</NavLink></li>
            </ul>
        </header>
    )
}

export default Header