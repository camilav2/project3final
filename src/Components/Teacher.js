import React, { Component } from 'react';
import axios from 'axios';
import SubjectForm from './Subject-form';

export default class Teacher extends Component {
    constructor() {
        super()
        this.state = {
            user: null
        }
    }

    handleSubmit = e => {
        e.preventDefault();
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
                <div className='my-students'>
                    <p>NAME</p>
                    <p>CITY</p>
                </div>
                <div className='timetable-teacher'>
                    <p>Your next class is on DATE at TIME at LOCATION/ONLINE</p>
                </div>
                <div className='payment-teacher'>
                    Your next payment is to be received on DATE from STUDENT NAME
                </div>

            </div>
        )
    }
}