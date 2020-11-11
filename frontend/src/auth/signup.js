import React from 'react';

class Signup extends React.Component {
    constructor() {
        super();
        this.state = {
            username: '',
            email: '',
            password: ''
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
    
        this.newUser();
    };

    newUser = (e) => {
        fetch("http://localhost:4000/signup", {
            method: "POST",
            headers: {
              "Content-type": "application/json"
            },
            body: JSON.stringify(this.state)
          })
            .then((response) => response.json())
            .then((result) => {
              console.log(result);
        });
    }

    render() {
      console.log(this.state)
        return (
            <div>
              <input
                onChange={this.onChange}
                type="text"
                name="username"
                placeholder="Username"
              />
              <input
                onChange={this.onChange}
                type="text"
                name="email"
                placeholder="Email"
              />
              <input
                onChange={this.onChange}
                type="password"
                name="password"
                placeholder="Password"
              />
              <button onClick={this.newUser}>Sign Up</button>
              <p className="message">Do you have an account? <a href="login">Login</a></p>
          </div>
        )
    }
}

export default Signup;