import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';

import GithubState from './context/github/GithubState';

import './App.css';

const App = () => {
//   const [users, setUsers] = useState([]);
//   const [user, setUser] = useState([]);
//   const [repos, setRepos] = useState([]);
//   const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  // state= {
  // 	users: [],
  // 	user: {},
  // 	repos: [],
  // 	loading: false,
  // 	alert: null
  // }

  // lifecycle method
  // async componentDidMount() {
  // 	this.setState({ loading: true })
  // 	const res = await axios.get(
  // 		`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
  // 		&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

  // 	this.setState({ users: res.data, loading: false })
  // }

  // search Github users
  //   const searchUsers = async (text) => {
  //     // this.setState({ loading: true })
  //     setLoading(true);

  //     const res = await axios.get(
  //       `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
  // 			&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
  //     );

  //     // this.setState({ users: res.data.items, loading: false })
  //     setUsers(res.data.items);
  //     setLoading(false);
  //   };

  // Get single Github user
//   const getUser = async (username) => {
//     setLoading(true);

//     const res = await axios.get(
//       `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
// 			&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
//     );

//     setUser(res.data);
//     setLoading(false);
//   };

  // Get users repos
//   const getUserRepos = async (username) => {
//     setLoading(true);

//     const res = await axios.get(
//       `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
// 			&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
//     );

//     setRepos(res.data);
//     setLoading(false);
//   };

  // clear user from state
//   const clearUsers = () => {
//     setUsers([]);
//     setLoading(false);
//   };

  // show alert
  const showAlert = (msg, type) => {
    // this.setState({ alert: { msg:msg, type:type } });
    setAlert({ msg, type });
    // setTimeout(() => this.setState({ alert: null}), 2000)
    setTimeout(() => setAlert(null), 2000);
  };

  return (
    // JSX Javascript extension, just one parent element
    // <Fragment>
    // 	<h1>Hello {name}</h1>
    // </Fragment>
    <GithubState>
      <Router>
        <div className='App'>
          <Navbar />
          <div className='container'>
            <Alert alert={alert} />
            <Switch>
              {/* Main page: search box and button */}
              <Route
                exact
                path='/'
                render={(props) => (
                  <Fragment>
                    <Search
                      // searchUsers={searchUsers}
                    //   clearUsers={clearUsers}
                    //   showClear={users.length > 0 ? true : false}
                      showAlert={showAlert}
                    />
                    {/* <Users loading={loading} users={users} /> */}
					<Users />
                  </Fragment>
                )}
              />
              {/* About page */}
              <Route exact path='/about' component={About} />
              {/* User page */}
              <Route
                exact
                path='/user/:login' component={User}
                // render={(props) => (
                //   <User
                //     {...props}
                //     // getUser={getUser}
                //     // getUserRepos={getUserRepos}
                //     // user={user}
                //     // repos={repos}
                //     // loading={loading}
                //   />
                // )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    </GithubState>
  );

  // without JSX
  /*
		return React.createElement(
			'div',
			{ className: 'App' }, 
			React.createElement('h1', null, 'Hello from React')
		);
		*/
};

export default App;
