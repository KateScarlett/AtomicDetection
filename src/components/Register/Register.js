import React from 'react';
import './Register.css';

const Register = ({onRouteChange}) => {
    return (
        <div className="SignIn center pa4 black-80">
            <form className="measure">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f1 text-shadow fw6 ph0 mh0 white center">Register</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f4 white text-shadow" htmlFor="name">Email</label>
                        <input className="pa2 center bn shadow-2" type="text" name="name"  id="name" />
                    </div>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f4 white text-shadow" htmlFor="email-address">Email</label>
                        <input className="pa2 center bn shadow-2" type="email" name="email-address"  id="email-address" />
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f4 white text-shadow" htmlFor="password">Password</label>
                        <input className="pa2 center bn shadow-2" type="password" name="password"  id="password" />
                    </div>
                </fieldset>
                <div className="">
                    <input
                        onClick={() => onRouteChange('home')}
                        className="purple-button b ph3 pv2 grow pointer f4 dib white"
                        type="submit"
                        value="Register"
                    />
                </div>
            </form>
        </div>
    );
};

export default Register;