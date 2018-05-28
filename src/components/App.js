import React, { Component } from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import base, { firebaseApp } from '../base';
import firebase from 'firebase';
// import Messages from './Messages';
// import MessageForm from './MessageForm';
import Landing from './Landing';
import Chat from './Chat';

class App extends Component {

  state = {
    user: {
      name: null,
      uid: null
    },
    loaded: false
  }
  
  constructor() {
    super();
    this.authenticate = this.authenticate.bind(this);
    this.authHandler = this.authHandler.bind(this);
    this.checkIfLogged = this.checkIfLogged.bind(this);
  }

  componentDidMount() {
    this.checkIfLogged();
    this.ref = base.syncState('roomsIds', {
      context: this,
      state: 'rooms',
      then: () => {
        this.setState({
          loaded: true
        })
      }
    });
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
    },
    loaded: true
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

  render() {
    return(
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={ (props) =>
          <Landing 
          {...props}
          loaded={this.state.loaded}
          user={this.state.user}
          authenticate={this.authenticate}
           /> }>
          }
        </Route>
        <Route path="/chat-room/:room" render={ (props) => <Chat {...props} user={this.state.user} /> }></Route>
      </Switch>
    </BrowserRouter>)
  }
}

export default App;