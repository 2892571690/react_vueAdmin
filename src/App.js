import React, { Component } from 'react';
import { Redirect, Route, BrowserRouter, Switch } from 'react-router-dom';

import Login from './view/Login/Login';
import Home from './view/Home/Home';

export default class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route path="/login" component={Login} />
					<Route path="/" component={Home} />
				</Switch>
			</BrowserRouter>
		);
	}
}
