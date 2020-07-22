import React, {Component} from 'react'
import Navbar from './components/layout/Navbar'
import Users from './components/users/Users'
import Search from './components/users/Search'
import axios from 'axios'
import './App.css'

class App extends Component {
	state= {
		users: [],
		loading: false
	}

	// lifecycle method
	async componentDidMount() {
		this.setState({ loading: true })
		const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
		this.setState({ users: res.data, loading: false })
	}

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
					<Search />
					<Users loading={this.state.loading} users={this.state.users} />
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
