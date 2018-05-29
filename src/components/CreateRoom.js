import React from 'react';

const CreateRoom = (props) => {
	const handleSub = (e) => {
		if(e.keyCode === 13 || e.type === 'click') {
			e.preventDefault();
			props.submit()
		}
	}
	return(
		<form className={'create-room-form ' + ((props.modal) ? '' : 'dn') }>
			<input onKeyUp={handleSub} type="text" placeholder="enter chat-room name" ref={props.setRef} />
			<button onClick={ handleSub }>Create chat</button>
			<br />
			<span className={'error-block ' + ( (props.error) ? '' : 'dn') }>Something went wrong. Maybe room with such name already exists. Or room name is not valid(use latin characters only)</span>
		</form>
	)
}

export default CreateRoom;