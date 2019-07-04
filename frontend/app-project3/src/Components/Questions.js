import React, { Component } from 'react'

export default class Questions extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: this.props.currentUser,
            question: this.props.question
        }
    }
    
    
    handleDetails = (event) => {
        this.setState({subjects: event.target.value});
      }

    render() {
        return (
            <>
                {this.props.question ? this.props.question.map((question, index) =>
                    (
                        <div key={index} onChange={this.handleDetails}>
                            <p>{this.state.user} : {question.name}</p>
                        </div>

                    )) : "Use the chat to send a message to your teacher and colleagues"}
            </>
        )
    }
}
