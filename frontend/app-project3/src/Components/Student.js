import React, { Component } from 'react'
import axios from 'axios';
import SubjectForm from './Subject-form';

export default class Student extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: null,
            redirect: false
        }
    }


    handleSubmit = e => {
        e.preventDefault("http://localhost:5000/subjects");
        this.props.submithandler(this.state)
    };

    addSubjects = subject => {
        const updatedSubjects = [...this.state.subjects];
        updatedSubjects.push(subject)
        this.setState({ subjects: updatedSubjects })
    }

    componentDidMount() {

        axios.get("http://localhost:5000/subjects")
            .then(response => {
                this.setState({ subjects: response.data })
            })
        axios.get("http://localhost:5000/users/teachers")
            .then(response => {
                this.setState({ teachers: response.data })
            })
    }

    setRedirect = () => {
        this.setState({
            redirect: true
        })
    }
    renderRedirect = (subjectId) => {
        this.props.history.push(`/subjects/get/${subjectId}`)
    }

    render() {
        return (
            <div>
                <button onClick={() => this.props.logoutUser()}>Logout</button>
                <SubjectForm userId={this.props.currentUser._id} addSubjects={this.addSubjects} />
                {this.state.subjects ? this.state.subjects.map(subject =>
                    (
                        
                            <p>{subject.name}
                <button onClick={() => this.renderRedirect(subject._id)}>Go</button> </p>
            
                 )) : "No subjects present"}

{/* create route to check teachers' details  */}
                <div className='my-teachers'>
                {this.state.teachers ? this.state.teachers.map(teachers =>
                    (
                        <div>
                            <p>{teachers.fullName}</p>
                            <p>{teachers.city}</p>
                            {teachers.subjects.map(subject => {
                                return <p>{subject.name}</p>
                            })}
                        </div>
                    )) : "No teachers present"}
                </div>

            </div>
        )
    }
}