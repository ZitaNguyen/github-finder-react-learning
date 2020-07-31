import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import GithubContext from '../../context/github/githubContext';

const Search = ({ showAlert }) => {
  const githubContext = useContext(GithubContext);

  // create text state
  const [text, setText] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    if (text === '') {
      showAlert('Please enter something', 'light');
    } else {
      githubContext.searchUsers(text);
      //   this.setState({ text: '' });
      setText('');
    }
  };

  //   const onChange = (e) => this.setState({ [e.target.name]: e.target.value }); // e.target.name replaces for text, email, phone, etc.
  const onChange = (e) => setText(e.target.value);

  return (
    <div>
      <form onSubmit={onSubmit} className='form'>
        <input
          type='text'
          name='text'
          placeholder='Search Users...'
          value={text}
          onChange={onChange}
        />
        <input
          type='submit'
          value='Search'
          className='btn btn-dark btn-block'
        />
      </form>
      {githubContext.users.length > 0 && (
        <button className='btn btn-light btn-block' onClick={githubContext.clearUsers}>
          Clear
        </button>
      )}
    </div>
  );
};

Search.propTypes = {
  // searchUsers: PropTypes.func.isRequired,
  // clearUsers: PropTypes.func.isRequired,
  // showClear: PropTypes.bool.isRequired,
  showAlert: PropTypes.func.isRequired,
};

export default Search;
