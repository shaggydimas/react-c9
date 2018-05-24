import React, { Component } from 'react';

class Login extends Component {
	username = React.createRef();
	render() {
		return(
			<div className="login-wrap">
				<div className="login-box">
					{/*<input type="text" ref={ this.username } placeholder="Введите ваше имя" />
					<button onClick={ () => { this.props.login(this.username.current.value) } }>Войти</button>
					*/}
					<button className="fb" onClick={ () => { this.props.auth('Facebook')} }>Login with Facebook</button>
					<button className="tw" onClick={ () => { this.props.auth('Twitter')} }>Login with Twitter</button>
				</div>
			</div>
		)
	}
}

export default Login;