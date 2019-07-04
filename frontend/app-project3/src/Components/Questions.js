import React, { Component } from 'react'

export default class Questions extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: this.props.currentUser.username,
            question: ""
        }
    }
    

    render() {
        return (
            <>
            {
                this.props.question ? this.props.question.map((question, index) =>
                    (
                        <div key={index}>
                        <p>{this.state.user} : {question.question}</p>
                        </div>

                    )) : "Use the chat to send a message to your teacher and colleagues"
            } 
            </>
        )
    }
}
