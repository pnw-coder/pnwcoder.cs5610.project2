import { NavLink } from 'react-router-dom'
import '../styles/NavBar.css'

function NavBar() {
    return (
        <div className="Navbar-Container">
            <NavLink to="/" className="nav-button">Home</NavLink>
            <NavLink to="/app" className="nav-button">Simulator</NavLink>
            <NavLink to="/credits" className="nav-button">Credits</NavLink>
        </div>
    )
}

export default NavBar