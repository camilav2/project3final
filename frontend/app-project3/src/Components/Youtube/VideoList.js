import React, { Component } from 'react';
import VideoListItem from './VideoListItem';
import { List } from 'antd';
import Axios from 'axios';
// import { threadId } from 'worker_threads';


class VideoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
        this.addVideos = this.addVideos.bind(this);
    }


    addVideos(videoId, subject) {
        const videoUrl = `http://www.youtube.com/embed/${ videoId }`;
        Axios.post('http://localhost:5000/subjects/videos', {
            videoUrl: videoUrl,
            videoSubject: subject
        })
           .then((result) => {
                console.log(result)
           }).catch((err) => {
               console.log(err)
           })
    }

    render() {
        const {videos} = this.props
        if (videos.length === 0) {
            return (
                <List
                    style={{ "width": "40%" }}
                    size={"large"}
                    header={<div>Video Suggestions</div>}
                    bordered
                    dataSource={this.state.data}
                    renderItem={item => (<List.Item>{item}</List.Item>)}
                />
            )
        }

        return (
            <ul style={{ "listStyle": "none", "width": "40%", "padding": "5px", "border": "1px solid #efefef", "marginBottom": "3px", "borderRadius": "5px" }}>
                          {videos.map((video, index) => {
            const videoId = video.id.videoId
            const subject = this.props.subject
            return (
                <div>
                    <VideoListItem
                        key={index}
                        video={video}
                        onAddVideo={this.addVideos(video.id.videoId)}
                        onUserSelected={this.props.onVideoSelect.bind(this, [index])}
                    />
                    <button onClick={this.addVideos(videoId, subject )}>Save</button>
                </div>
            )
        })}
            </ul>
        );
    }
}

export default VideoList;