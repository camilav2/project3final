import React, { Component } from 'react'
import axios from 'axios';

export default class Course extends Component {
    constructor(){
        super()
        this.state = {
            user: null
        }
    }


    componentDidMount() {
       
        axios.get("http://localhost:5000/subjects/user", {withCredentials: true})
            .then(response => {
                console.log(response)
                this.setState({ subjects: response.data })
            })
    }

    render() {
        return (
            <div>
                
            </div>
        )
    }
}
