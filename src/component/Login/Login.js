import React from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import './Login.css';

const Login = () => {
    const {user, signInUsingGoogle} = useAuth();
    const location = useLocation();
    // console.log('Came from login', location.state?.from);
    const history = useHistory();
    const redirect_uri = location.state?.from || '/shop';

    const handleGoogleLogin = () => {
        signInUsingGoogle()
        .then(result => {
            history.push(redirect_uri);
          })
    }
    return (
        <div className="login-form">
            <div>
                <h2>Login with {user.displayName}</h2>
                <form onSubmit="">
                    <input type="email" placeholder="Your Email"/>
                    <br/>
                    <input type="password" placeholder="Your Password"/>
                    <br/>
                    <input type="submit" value="Submit"/>
                </form>
                <p>New to e-store? <Link to="/register">Create Account</Link></p>
                <div>----------------- Or -----------------</div>
                <button className="btn-regular" onClick={handleGoogleLogin}>Google Sign In</button>
                <br/>
                <button className="btn-regular">Facebook Sign In</button>
            </div>
        </div>
    );
};

export default Login;