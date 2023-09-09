import React from 'react';
import './SignInRegister.css';
import SignIn from "../SignIn/SignIn";
import Register from "../Register/Register";

const SignInRegister = ({loadUser, route, onRouteChange}) => {
    if (route === 'signin') {
        return (
            <SignIn loaduser={loadUser} onRouteChange={onRouteChange}/>
        );
    } else if (route === 'register') {
        return (
            <Register loadUser={loadUser} onRouteChange={onRouteChange}/>
        )
    }
};

export default SignInRegister;
