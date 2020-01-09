import React, { Component } from 'react';

class LogIn extends Component {
    state = {
        email: '',
        password: ''
    }

    handleChange = (e) => {
        // console.log(e.target.id)
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // console.log(this.state)
        // use props and redux to send this to store of use an action
    }

    render() {
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text darken-3">Log In</h5>
                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <input type="text" id="password" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <button className="btn pink lighten-1 z-depth-0">Log In</button>
                        <div className="red-text center">
                            {/* autherror */}
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default LogIn;