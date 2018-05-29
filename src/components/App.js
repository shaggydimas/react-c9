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
    this.guestUser = this.guestUser.bind(this);
    this.loadSuccess = this.loadSuccess.bind(this);
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

  loadSuccess() {
    this.setState({
      loaded: true
    })
  }

  authHandler(user) {
    this.setState({ user: {
      name: user.displayName,
      uid: user.uid
    },
    loaded: true
    })
  }

  guestUser() {
   this.setState({ user: {
      name: 'Guest User',
      uid: Date.now()
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
        <Route exact path={process.env.PUBLIC_URL+'/'} render={ (props) =>
          <Landing 
          {...props}
          loaded={this.state.loaded}
          loadSuccess={this.loadSuccess}
          user={this.state.user}
          authenticate={this.authenticate}
          guest={this.guestUser}
           /> }>
          }
          }
        </Route>
        <Route path={process.env.PUBLIC_URL+'/chat-room/:room'} render={ (props) =>
          <Chat
          {...props}
          loaded={this.state.loaded}
          loadSuccess={this.loadSuccess}
          user={this.state.user}
          guest={this.guestUser}
          /> }></Route>
      </Switch>
    </BrowserRouter>)
  }
}

export default App;