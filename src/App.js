import React, {Fragment, Component} from 'react';
import './App.css';

class App extends Component{
	// lifecycle method
	render() {
		const name = 'Zita';
		return (
			// JSX Javascript extension, just one parent element
				<Fragment>
					<h1>Hello {name.toUpperCase}</h1>
				</Fragment>
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
