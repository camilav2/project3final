import React, { Component } from 'react'
import axios from 'axios';
import SubjectForm from './Subject-form';
import Course from "./Course"

export default class Student extends Component {
    constructor(){
        super()
        this.state = {
            user: null
        }
    }

    handleSubmit = e => {
        e.preventDefault("http://localhost:5000/subjects");
        this.props.submithandler(this.state)
    };

    componentDidMount() {
       
        axios.get("http://localhost:5000/subjects")
            .then(response => {
                this.setState({ subjects: response.data })
            })
    }

    render() {
        return (
            <div>
                 <SubjectForm userId= {this.props.currentUser._id} />
                 <Course />
                <div className='my-teachers'>
                    <p>NAME</p>
                    <p>CITY</p>
                </div>
                <div className='timetable-student'>
                    <p>Your next class is on DATE at TIME at LOCATION/ONLINE</p>
                </div>
                <div className='payment-student'>
                    Your next payment is to due on DATE from STUDENT NAME
            </div>
            </div>
        )
    }
}