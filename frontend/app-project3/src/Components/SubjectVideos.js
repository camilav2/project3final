import React, { Component } from 'react'
import YouTube from 'react-youtube';

export default class SubjectVideos extends Component {
    render() {
        return (
            <div>
                {this.props.subjectData.videoUrl ? this.props.subjectData.videoUrl.map(video => {
                    return <YouTube
                    videoId={video}                  
                  />
                }): ""}
            </div>
        )
    }
}
