import React, { Component } from 'react';

class SignupChat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.currentUser,
            question: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
        this.setState({ question: e.target.value });
    }
    handleSubmit(e) {
        e.preventDefault()
        this.props.addQuestion(this.state.question);
    }
    render() {
        return (
            
            <div className="form-container">
                <h1>Let's Talk</h1>
                <form onSubmit={this.handleSubmit} className="form">
                    <label htmlFor="text">Hello {this.state.user.username}! Submit you question.</label>
                    <input type="text" name="question" onChange={this.handleChange} className="input" />
                    <button className="submit">Submit</button>
                </form>
            </div>
        )
    }
}
export default SignupChat;