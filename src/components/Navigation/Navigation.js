import React from 'react';
import './Navigation.css';

const Navigation = ({onRouteChange, isSignedIn}) => {
        if(isSignedIn){
            return(
            <nav className="Navigation">
                <p onClick={() => onRouteChange('signout')} className="text-shadow f3 link dim white pa3 pointer">Sign
                    Out</p>
            </nav>
            )
        }else{
            return(
            <nav className="Navigation">
                <p onClick={() => onRouteChange('signin')} className="text-shadow f3 link dim white pa3 pointer">Sign In</p>
                <p onClick={() => onRouteChange('register')} className="text-shadow f3 link dim white pa3 pointer">Register</p>
            </nav>
            )
        }
};

export default Navigation;
