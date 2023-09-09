import React from 'react';
import './Register.css';

class Register extends React.Component {

    constructor(props) {
        super();
        this.state = {
            email: '',
            password: '',
            name: ''
        }
    }

    onNameChange = (event) => {
        this.setState({name: event.target.value})
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({password: event.target.value})
    }

    onSubmitRegister = async (event) => {
        event.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
            })
        };
        const response = await fetch('http://localhost:3000/register', requestOptions);
        const user = await response.json();
        if(Object.keys(user).length !== 0 && user.id){
            this.props.loadUser(user);
            this.props.onRouteChange('home');
        }
    }
    render() {
        return (
            <div className="SignIn center pa4 black-80">
                <form className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 text-shadow fw6 ph0 mh0 white center">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f4 white text-shadow" htmlFor="name">Name</label>
                            <input onChange={this.onNameChange} className="pa2 center bn shadow-2" type="text" name="name" id="name"/>
                        </div>
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
                            onClick={this.onSubmitRegister}
                            className="purple-button b ph3 pv2 grow pointer f4 dib white"
                            type="submit"
                            value="Register"
                        />
                    </div>
                </form>
            </div>
        );
    }
}

export default Register;
