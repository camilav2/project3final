import React, { Component } from 'react';
import  { AutoComplete, button, Icon } from 'antd';
const Option = AutoComplete.Option;

class SearchBar extends Component {

    state = {
      videos: []
    };

    componentDidUpdate( prevProps ) {
      if( this.props.video && prevProps.video !== this.props.video ) {
          this.setState({ videos: this.props.videos })
      }
    }

    onSelect = (value, index ) => {
        let val = parseInt(index.key, 10);
        this.props.handleSearch( val );
    };

    render() {
        return(
            <div style={{ "textAlign": "center", "background": "#007BFF", "padding": "35px" }}>
                <AutoComplete
                    size={"large"}
                    style={{ width: 400 }}
                    onSelect={ this.onSelect }
                    onBlur={ this.props.search }
                    placeholder="Search Video"
                >
                    { this.state.videos.map((video, index)  => <Option key={ index } >{ video.snippet.title }</Option> ) }
                </AutoComplete>
                <button style={{ "marginLeft":"5px" }} size={"large"}><Icon type={"search"}/></button>
            </div>
        );
    }
}

export default SearchBar;