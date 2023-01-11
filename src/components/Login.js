import React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { setAuthedUser } from '../actions/authedUser';

const Login = ({ userIds, users, dispatch }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    e.preventDefault();
    setSelectedOption(e.target.value);

    if (e.target.value !== '' && e.target.value !== 'none') {
      dispatch(setAuthedUser(e.target.value));
      navigate(location?.state?.location);
    } else if (e.target.value === 'none') {
      dispatch(setAuthedUser(''));
      navigate('/');
    }
  };

  return (
    <div>
      <span>Select user to login with </span>
      <select
        name="users"
        defaultValue={selectedOption}
        onChange={handleChange}
      >
        <option value={'none'} key={'none'}>
          None
        </option>
        {userIds.map((id) => {
          return (
            <option value={id} key={id}>
              {users[id].name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

const mapStateToProps = (state) => {
  const users = state.users;
  return {
    userIds: Object.keys(users),
    users,
  };
};

export default connect(mapStateToProps)(Login);