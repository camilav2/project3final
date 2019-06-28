import React, { Component } from 'react';
import VideoListItem from './VideoListItem';
import { List } from 'antd';

class VideoList extends Component {
    state = {
        data: []
    };


// addVideos = () => {
//     const url = this.state.data.index.snippet.thumbnails.default;
//     const savedVideos = this.props.subject.videoUrl.push(url)
//     this.setState({ suject: savedVideos })
//     console.log(url)
//     }

    render() {
        if( this.props.videos.length === 0 ) {
          return (
              <List
                  style={{ "width": "40%"}}
                  size={"large"}
                  header={<div>Video Suggestions</div>}
                  bordered
                  dataSource={ this.state.data }
                  renderItem={item => (<List.Item>{item}</List.Item>)}
              />
          )
        }

        const videoItems = this.props.videos.map((video, index) => {
            return (
                <div>
                <VideoListItem
                    key={ index }
                    video={video}
                    onUserSelected={ this.props.onVideoSelect.bind( this, [ index ]) }
                    />   
                {/* <button onClick={() => this.addVideos()}>Save</button>   */}
                </div>
            )
        });

        return (
            <ul style={{ "listStyle":"none" ,"width":"40%", "padding": "5px", "border": "1px solid #efefef", "marginBottom": "3px", "borderRadius": "5px" }}>
                { videoItems }
            </ul>
        );
    }
}

export default VideoList;