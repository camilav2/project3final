import React, { Component } from 'react';
import SearchBar from './SearchBar';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';
import YTSearch from 'youtube-api-search';
import { Icon, notification } from 'antd';
import dotenv from 'dotenv';
import youtubeAPI from '../../api-configYT'

dotenv.config();



class MainYoutube extends Component {
  constructor( props ) {
    super(props);
    this.state = {
       videos: [],
       search: true,
       selectedVideo: {}
    };

    this.welcome();
  }

  welcome = () => {

      notification.open({
          message: 'Hey nice to see you here',
          description: 'Check the updates of your class on this page',
          icon: <Icon type="smile" style={{ color: '#108ee9' }} />
      })
  };

  videoSearch( term ) {
        if( this.state.search ) {
             YTSearch({ key: youtubeAPI.key, term }, (data) => {
                 try {
                     if( data && data.data && data.data.error.message ) {
                         console.log(data);
                         throw new Error();
                     }
                     this.setState({ videos: data, selectedVideo: data[0] });
                     console.log( this.state.videos );
                 } catch( err ){
                     notification['error']({
                         message: "Daily Limit Exceeded",
                         description: "Youtube data API daily limit have exceeded. Quota will be recharged at 1:30pm IST. Wait till then.",
                     })
                 }

             });
         }

  }

  handleChange = (value) => {
    setTimeout( () => {
      if( value === ''){
        this.setState({ videos: [], selectedVideo: null });
        return;
      }

      if( this.state.search ) {
        this.videoSearch( value );
      }

      setTimeout( () => {
        this.setState({ search: true });
      }, 5000);

    }, 2000);

  };

  render() {
    const {subject} = this.props
    console.log(subject, 'subject in main')
    return (
      <div style={{ "display": "flex", "flexDirection": "column"  }}>
        <div style={{ "display": "flex", "justifyContent": "space-between", "background": "#007BFF"}}>
            <h1 style={{ "color": "#fff", "alignSelf": "center", "flexBasis": "4", "paddingTop": "20px", "paddingLeft": "30px" }}>Search for content <Icon type={"search"}/></h1>
            <SearchBar videos={ this.state.videos } video={ this.state.selectedVideo } onChange={ this.handleChange } handleSearch={ (video) => { this.setState({ selectedVideo: this.state.videos[video], search: false })}}/>
        </div>
        <div style={{ "display" : "flex" }}>
          <VideoDetail video={ this.state.selectedVideo }/>
          <VideoList
              subject={subject}
              videos={ this.state.videos }
              onVideoSelect={ ( userSelected ) => { this.setState({ selectedVideo: this.state.videos[ userSelected ] }) }}
          />
        </div>
      </div>
    );
  }
}

export default MainYoutube;