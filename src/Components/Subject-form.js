import React, { Component } from 'react';
import axios from 'axios';

export default class SubjectForm extends Component {
    state = {
        name: "",
        userId: ""
    }
    changeHandler = e => {
        const {  value } = e.target;
        this.setState({
            name: value
        });
    }

    createSubject(e) {
        e.preventDefault()
        axios.post("http://localhost:5000/subjects/create", {
          name: this.state.name,
          userId: this.props.userId
        })
          .then(response => {
            console.log(response.data)
            this.setState({ subjects: response.data })
          }).catch(err => {
            console.log(err)
          })
      }

        render() {
            return (
                <div>
                    <form onSubmit={e => this.createSubject(e)}>
                        <input
                            name="name"
                            type="text"
                            placeholder="subject"
                            value={this.state.name}
                            onChange={e => this.changeHandler(e)}
                        />
                        <input type="submit" value="submit" />
                    </form>
                </div>
            )
        }
    }

