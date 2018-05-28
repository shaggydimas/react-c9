import React, { Component } from 'react';
import Messages from './Messages';
import MessageForm from './MessageForm';
import ChatHeader from './ChatHeader';
import base, { firebaseApp } from '../base';
import firebase from 'firebase';

class Chat extends Component {

	state = {
		messages: {},
		loaded: false
	}

	constructor() {
		super();
		this.setRef = this.setRef.bind(this);
		this.handleComment = this.handleComment.bind(this);
	}

	componentDidMount() {
    this.ref = base.syncState('rooms/'+this.props.match.params.room, {
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

  handleComment(message) {
  	if(message.replace(/\s/g, '').length < 1) return;
  	const messages = {...this.state.messages};
  	const user = this.props.user.name;
  	const uid = this.props.user.uid;
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
    console.log(this.messagesContainer);
  }

	render() {
		return(
			<React.Fragment>
				<ChatHeader chatName={this.props.match.params.room} push={this.props.history.push} />
				<Messages messages={this.state.messages} user={this.props.user} setRef={this.setRef} />
				<MessageForm handleComment={this.handleComment} />
			</React.Fragment>
		)
	}
}

export default Chat;