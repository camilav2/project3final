import React, { Component } from 'react';
import MainYoutube from './Youtube/MainYoutube'

export default class AddVideos extends Component {
    constructor( props ) {
        super(props);
        this.state = {
        subject: "",
        user: this.props.currentUser,
        }
    }

    render() {
        const { match: { params: {subjectId} } } = this.props;
        return (
            <div>
                <MainYoutube subject={this.state.subject.name} subjectId={subjectId}/>
            </div>
        )
    }
}
