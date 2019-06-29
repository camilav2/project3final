import React, { Component } from 'react';
    import ChatMessage from './ChatMessage';
    import SignupChat from './SignupChat'; 
    import ChatApp from './ChatApp'; 
    import chatkitAPI from '../../api-configChat'

    const Chatkit = require("@pusher/chatkit-server");

    const chatkit = new Chatkit.default({
    instanceLocator: chatkitAPI.instanceLocator,
    key: chatkitAPI.key
}
)

class MainChat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.currentUser,
            currentUsername: '',
            currentId: '',
            currentView: 'ChatMessage'
        }
        this.changeView = this.changeView.bind(this);
        this.createUser = this.createUser.bind(this);
    }

    createUser(username) {
        chatkit.createUser({
            id: username,
            name: username,
        })
        .then((currentUser) => {
            this.setState({
                currentUsername: username,
                currentId: username,
                currentView: 'chatApp'
            })
        }).catch((err) => {
                 if(err.status === 400) {
                this.setState({
                    currentUsername: username,
                    currentId: username,
                    currentView: 'chatApp'
                })
            } else {
                console.log(err.status);
            }
        });
    }

  changeView(view) {
      this.setState({
          currentView: view
      })
  }

  render() {
    let view ='';
    if (this.state.currentView === "ChatMessage") {
        view = <ChatMessage  changeView={this.changeView}/>
    } else if (this.state.currentView === "signupChat") {
        view = <SignupChat currentUser={this.state.user} addQuestion={this.props.addQuestion} />
    } else if (this.state.currentView === "chatApp") {
        view = <ChatApp currentId={this.state.currentId} currentUser={this.state.user} addQuestion={this.props.addQuestion}/>
    }
    return (
        <div className="main-chat">
            {view}
        </div>
    );
}
}
export default MainChat;