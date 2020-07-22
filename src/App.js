import React, {Component} from 'react'
import Navbar from './components/layout/Navbar'
import Users from './components/users/Users'
import './App.css'

class App extends Component {

	// lifecycle method
	render() {
		return (
			// JSX Javascript extension, just one parent element
			// <Fragment>
			// 	<h1>Hello {name}</h1>
			// </Fragment>
			<div className='App'>
				<Navbar />
				<div className="container">
					<Users />
				</div>
			</div>
		);

		// without JSX
		/*
		return React.createElement(
			'div',
			{ className: 'App' }, 
			React.createElement('h1', null, 'Hello from React')
		);
		*/
	}
}

export default App;
