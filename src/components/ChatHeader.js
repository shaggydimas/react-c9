import React from 'react';

const ChatHeader = (props) => {
	const goHome = (e) => {
		e.preventDefault();
		props.push('/');
	}
	return(
		<div className="chat-header">
			<a href="/" onClick={goHome}>Home</a> <b>{props.chatName}</b>
		</div>
	)
}

export default ChatHeader;