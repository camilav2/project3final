import React, { Component } from 'react'

export default class Subjects extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: null
        }
    }


    handleDetails = (event) => {
        this.setState({subjects: event.target.value});
      }
    

    render() {
        return (
            <div>
                {this.props.subjects ? this.props.subjects.map((subjects, index) =>
                    (
                        <div key={index} onChange={this.handleDetails}>
                            <p>{subjects.name}</p>
                        </div>
                    )) : "No subjects present"}
            </div>
        )
    }
}
