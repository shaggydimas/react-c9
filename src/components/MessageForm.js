import React, { Component } from 'react';

class MessageForm extends Component {
	constructor() {
		super();
		this.inputVal = React.createRef();
		
	}

	handleSubmit(e) {
		const { handleComment } = this.props;
		if(e.keyCode === 13 || e.type === 'click') {
			handleComment(this.inputVal.current.value);
			this.inputVal.current.value = '';
			this.inputVal.current.focus();
			
		}
	}
	render() {
		return(
			<div className="msg-form">
				<input type="text" onKeyUp={ this.handleSubmit.bind(this) } placeholder="Enter your message" ref={this.inputVal} />
				<button onClick={ this.handleSubmit.bind(this) }>Enter</button>
			</div>
			)
	}
}

export default MessageForm;