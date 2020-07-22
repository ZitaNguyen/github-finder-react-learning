import React, {Component, Fragment} from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Users from './components/users/Users'
import Search from './components/users/Search'
import Alert from './components/layout/Alert'
import About from './components/pages/About'
import axios from 'axios'
import './App.css'

class App extends Component {
	state= {
		users: [],
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

	// clear user from state
	clearUsers = () => this.setState({ users:[], loading: false })

	// set alert
	setAlert = (msg, type) => {
		this.setState({ alert: { msg:msg, type:type } });
		setTimeout(() => this.setState({ alert: null}), 2000)
	}

	// lifecycle method
	render() {
		const { users, loading, alert } = this.state
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
