import React, { Component } from 'react'
import YouTube from 'react-youtube';

export default class SubjectVideos extends Component {
    render() {
        return (
            <div>
                <pre>{JSON.stringify(this.props.subjectData, "\t", 2)}</pre>
                {this.props.subjectData.videoUrl ? this.props.subjectData.videoUrl.map(video => {
                    return <YouTube
                    videoId={video}                  
                  />
                }): ""}
            </div>
        )
    }
}
