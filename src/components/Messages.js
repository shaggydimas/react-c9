import React from 'react';

const Messages = (props) => {
	return(
		<div className="messages" ref={ props.setRef}>
			<ul>
			 { Object.keys(props.messages).map((msg) =>
			  <li key={ msg } className={ (props.user.uid === props.messages[msg].uid) ? 'my-comment' : '' }>
			  	<div>
			  		<span>{ props.messages[msg].name } | { props.messages[msg].time }</span>
					  <p>{props.messages[msg].message}</p>
			  	</div>
			  </li>) 
			}
			</ul>
		</div>
	)
}

export default Messages;