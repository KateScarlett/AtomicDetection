import React from 'react';
import './SignIn.css';

class SignIn extends React.Component {

    constructor(props) {
        super();
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
    }
    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    }

    onSubmitSignIn = async (event) => {
        event.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        };
        const response = await fetch('http://localhost:3000/signin', requestOptions);
        const user = await response.json();
        if(Object.keys(user).length !== 0 && user.id){
            this.props.loaduser(user);
            this.props.onRouteChange('home');
        }
    }

    render() {
        const {onRouteChange} = this.props;
        return (
            <div className="SignIn center pa4 black-80">
                <form className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 text-shadow fw6 ph0 mh0 white center">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f4 white text-shadow" htmlFor="email-address">Email</label>
                            <input onChange={this.onEmailChange} className="pa2 center bn shadow-2" type="email" name="email-address"
                                   id="email-address"/>
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f4 white text-shadow" htmlFor="password">Password</label>
                            <input onChange={this.onPasswordChange} className="pa2 center bn shadow-2" type="password" name="password" id="password"/>
                        </div>
                    </fieldset>
                    <div className="">
                        <input
                            onClick={this.onSubmitSignIn}
                            className="purple-button b ph3 pv2 grow pointer f4 dib white"
                            type="submit"
                            value="Sign in"
                        />
                    </div>
                    <div className="lh-copy mt3">
                        <p onClick={() => onRouteChange('register')}
                           className="f6 link dim db white pointer">Register</p>
                    </div>
                </form>
            </div>
        );
    }
}

export default SignIn;
