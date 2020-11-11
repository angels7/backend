import React from 'react';

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: ''
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
    
        this.newLogin();
    };

    newLogin = (e) => {
        fetch("http://localhost:4000/login", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(this.state)
          })
            .then((response) => response.json())
            .then((result) => {
              console.log(result);
        });
    }

    render() {
        return (
            <div>
            <form onSubmit={this.onSubmit}>
              <input
                onChange={this.onChange}
                type="text"
                name="username"
                placeholder="Username"
              />
              <input
                onChange={this.onChange}
                type="password"
                name="password"
                placeholder="Password"
              />
              <button>Login</button>
              <p className="message">Do you have need an account? <a href="signup">Sign Up</a></p>
            </form>
          </div>
        )
    }
}

export default Login;