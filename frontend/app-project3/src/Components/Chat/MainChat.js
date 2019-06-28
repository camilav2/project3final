import React, { Component } from 'react';
    import ChatMessage from './ChatMessage';
    import SignupChat from './SignupChat'; 
    import ChatApp from './ChatApp'; 

    const Chatkit = require("@pusher/chatkit-server");

    const chatkit = new Chatkit.default({
    instanceLocator: "v1:us1:6e800b4d-c9e6-431d-9c46-0594413188ea",
    key: "a4126d67-6a95-4551-b217-beab487c3edb:Y6Jhmr72RPTEI9A3Bm7I9ffbh17RECKB3I0q9dv666Q="
})

class MainChat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUsername: '',
            currentId: '',
            currentView: 'signupChat'
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
        view = <SignupChat onSubmit={this.createUser}/>
    } else if (this.state.currentView === "chatApp") {
        view = <ChatApp currentId={this.state.currentId} />
    }
    return (
        <div className="main-chat">
            {view}
        </div>
    );
}
}
export default MainChat;