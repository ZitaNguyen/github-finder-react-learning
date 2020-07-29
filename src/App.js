import React, {Component, Fragment} from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Users from './components/users/Users'
import User from './components/users/User'
import Search from './components/users/Search'
import Alert from './components/layout/Alert'
import About from './components/pages/About'
import axios from 'axios'
import './App.css'

class App extends Component {
	state= {
		users: [],
		user: {},
		repos: [],
		loading: false,
		alert: null
	}

	// lifecycle method
	// async componentDidMount() {
	// 	this.setState({ loading: true })
	// 	const res = await axios.get(
	// 		`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
	// 		&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

	// 	this.setState({ users: res.data, loading: false })
	// }

	// search Github users
	searchUsers = async text => {
		this.setState({ loading: true })
		
		const res = await axios.get(
			`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
			&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

		this.setState({ users: res.data.items, loading: false })
	}

	// Get single Github user
	getUser = async username => {
		this.setState({ loading: true })
		
		const res = await axios.get(
			`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
			&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

		this.setState({ user: res.data, loading: false })
	}

	// Get users repos
	getUserRepos = async username => {
		this.setState({ loading: true })
		
		const res = await axios.get(
			`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
			&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

		this.setState({ repos: res.data, loading: false })
	}


	// clear user from state
	clearUsers = () => this.setState({ users:[], loading: false })

	// set alert
	setAlert = (msg, type) => {
		this.setState({ alert: { msg:msg, type:type } });
		setTimeout(() => this.setState({ alert: null}), 2000)
	}

	// lifecycle method
	render() {
		const { users, user, repos, loading, alert } = this.state
		return (
			// JSX Javascript extension, just one parent element
			// <Fragment>
			// 	<h1>Hello {name}</h1>
			// </Fragment>
			<Router>
				<div className='App'>
					<Navbar />
					<div className="container">
						<Alert alert={alert} />
						<Switch>
							<Route exact path='/' render={props => (
								<Fragment>
									<Search 
										searchUsers={this.searchUsers} 
										clearUsers={this.clearUsers} 
										showClear={users.length > 0 ? true: false} 
										setAlert={this.setAlert}
									/>
									<Users loading={loading} users={users} />
								</Fragment>
							)} />
							<Route exact path='/about' component={About} />
							<Route 
								exact 
								path='/user/:login' 
								render={props => (
									<User 
										{ ...props }  
										getUser={this.getUser} 
										getUserRepos={this.getUserRepos}
										user={user} 
										repos={repos}
										loading={loading} 
									/>
								)} />
						</Switch>
					</div>
				</div>
			</Router>
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
