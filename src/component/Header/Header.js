import React from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import './Header.css';

const Header = () => {
    const {user, logOut} = useAuth();
    return (
        <div className="header">
            <nav>
                <NavLink to="/shop">Shop</NavLink>
                <NavLink to="/review">Orders Review</NavLink>
                <NavLink to="/inventory">Manage Inventory</NavLink>
                {user.displayName && <NavLink to="/orders">Orders</NavLink>}
                {user.displayName && <span style={{color: '#fff'}}>Hello {user.displayName}</span>}
                {   
                    user.displayName ?
                    <button onClick={logOut}>LogOut</button>
                    :
                    <NavLink to="/login">Login</NavLink>
                }
            </nav>
        </div>
    );
};

export default Header;