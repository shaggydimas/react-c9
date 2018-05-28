import React, { Component } from 'react';
import Login from './Login';
import Rooms from './Rooms';
class Landing extends Component {
	render() {
		if(!this.props.user.name) {
			return <Login auth={ this.props.authenticate } />
		}
		else if(!this.props.loaded) {
			return <div className="loader">Loading...</div>
		}
		else {
			return (
				<Rooms username={this.props.user.name} push={this.props.history.push} />
			)
		}
	}
}

export default Landing;