import React, { Component } from 'react';
import base, { firebaseApp } from './base';
import firebase from 'firebase';
import Messages from './components/Messages';
import MessageForm from './components/MessageForm';
import Login from './components/Login';

class App extends Component {

  state = {
    user: {
      name: null,
      uid: null
    },
    messages:{},
    loaded: false
  }
  
  constructor() {
    super();
    this.handleComment = this.handleComment.bind(this);
    this.setRef = this.setRef.bind(this);
    this.authenticate = this.authenticate.bind(this);
    this.authHandler = this.authHandler.bind(this);
    this.checkIfLogged = this.checkIfLogged.bind(this);
  }

  componentDidMount() {
    this.checkIfLogged();
    this.ref = base.syncState('messages', {
      context: this,
      state: 'messages',
      then: () => {
        this.setState({
          loaded: true
        })
        if(this.messagesContainer !== undefined) {
          this.messagesContainer.scrollTo( 0, 99999 );
        }
      }
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  checkIfLogged() {
    const self = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log(user.uid);
        self.authHandler(user);
      }
    });
  }

  authHandler(user) {
    this.setState({ user: {
      name: user.displayName,
      uid: user.uid
    }
    })
  }

  authenticate(provider) {
    const prov = (provider === 'Facebook') ? new firebase.auth.FacebookAuthProvider(): new firebase.auth.TwitterAuthProvider();
    firebaseApp
    .auth()
    .signInWithPopup(prov)
    .then(function(result) {
      this.authHandler(result);
    }).catch(function(error) {

    });
}

  handleComment(message) {
    if(message.replace(/\s/g, '').length < 1) return;
    const messages = {...this.state.messages};
    const user = this.state.user.name;
    const uid = this.state.user.uid;
    const d = new Date();
    const m = (d.getMinutes().toString().length === 1)
    ? ('0' + d.getMinutes()) : d.getMinutes();
    const time = d.getHours() + ':' + m;
    const obj = {
      name: user,
      time: time,
      uid,
      message
    };
    messages['Message-'+Date.now()] = obj;
    this.setState({
      messages
    }, () => {
      this.messagesContainer.scrollTo( 0, 99999 );
    })
  }

  setRef(ref) {
    this.messagesContainer = ref;
  }

  render() {
    if(!this.state.user.name) {
      return <Login auth={ this.authenticate } />
    }
    else if(!this.state.loaded) {
      return <div className="loader">Test...</div>
    }
    else {
      return (
        <React.Fragment>
          <Messages messages={ this.state.messages } user={ this.state.user } setRef={ this.setRef }/>
          <MessageForm handleComment={this.handleComment} />
        </React.Fragment>
      );
    }

  }
}

export default App;
