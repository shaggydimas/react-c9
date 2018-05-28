import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Test from './Test';
const Router = () => {
	return(
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={App}></Route>
				<Route path="/test" component={Test}></Route>
				<Route path="/chat-room/:room" component={Test}></Route>
			</Switch>
		</BrowserRouter>
	)
}

export default Router;