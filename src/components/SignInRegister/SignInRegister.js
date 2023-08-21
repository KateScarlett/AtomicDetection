import React from 'react';
import './SignInRegister.css';
import SignIn from "../SignIn/SignIn";
import Register from "../Register/Register";

const SignInRegister = ({route, onRouteChange}) => {
    if (route === 'signin') {
        return (
            <SignIn onRouteChange={onRouteChange}/>
        );
    } else if (route === 'register') {
        return (
            <Register onRouteChange={onRouteChange}/>
        )
    }
};

export default SignInRegister;
