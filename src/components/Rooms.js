import React, { Component } from 'react';
import CreateRoom from './CreateRoom';
import base from '../base';

class Rooms extends Component {
	
	state = {
		rooms: {

		},
		ui: {
			modalOpened: false
		},
		loaded: false,
		errors: false
	}

	constructor() {
		super();
		this.setRef = this.setRef.bind(this);
		this.onCreateRoom = this.onCreateRoom.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
	}

	componentDidMount() {
		this.ref = base.syncState('chat-rooms/', {
			context: this,
			state: 'rooms',
			then: () => this.props.loadSuccess
		});
	}

	componentWillUnmount() {
    base.removeBinding(this.ref);
  }

	setRef(ref) {
  	this.inputVal = ref;
  }

  onCreateRoom() {
  	const rooms = {...this.state.rooms};
  	const val  = this.inputVal.value;
  	if(val.length > 0 && rooms[val] === undefined && val.replace(/^[a-zA-Z]*$/,'').length === 0) {
	  	const obj = {
	  		name: val,
	  		user: this.props.username
	  	}
	  	rooms[val] = obj;
	  	this.setState({
	  		rooms,
	  		errors: false
	  	})
	  	this.props.push(process.env.PUBLIC_URL + '/chat-room/'+val);
  	}
  	this.setState({
  		errors: true
  	})
  }

  toggleModal() {
  	const modalOpened = !this.state.ui.modalOpened;
  	this.setState ({
  		ui: {
  			modalOpened: modalOpened
  		}
  	});
  }

  goToChat(chatName) {
  	this.props.push(process.env.PUBLIC_URL+'/chat-room/'+chatName);
  }

	render() {
		return(
			<div className="rooms-wrap">
				<button className="red-btn" onClick={ this.toggleModal }>Create chat</button>
				<CreateRoom
				error={this.state.errors}
				modal={this.state.ui.modalOpened}
				setRef={this.setRef}
				submit={this.onCreateRoom} />
				<h3 className="white-color">Chat rooms</h3>
				<ul className="chat-rooms">
				{ Object.keys(this.state.rooms).map((key) =>
					<li key={key}>
					 <a href="javascript:void(0)" title="Join chat" onClick={() => { this.goToChat(key) }}><b>{key}</b> <span>created by: { this.state.rooms[key].user }</span></a>
					</li>
					)
				}
				</ul>
			</div>
		)
	}
}

export default Rooms;