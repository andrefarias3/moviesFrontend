import { NavLink } from 'react-router-dom';
import './Navbar.scss';

const Navbar = () => {
    return (
        <div className="navbar">
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/list">List</NavLink>
        </div>
    );
};

export default Navbar;
