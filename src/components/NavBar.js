import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logoutAuthedUser } from "../actions/authedUser";
import Login from './Login'

const NavBar = ({ user, authedUser, dispatch }) => {
  const name = user?.name ?? "";

  const handleClick = () => {
    dispatch(logoutAuthedUser());
  };

  return (
    <nav className="nav">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {authedUser && (
        <li>
          <Link to="/leaderboard">Leaderboard</Link>
        </li>
        )}
        {authedUser && (
        <li>
          <Link to="/add">New Poll</Link>
        </li>
        )}
        {authedUser && (
          <li className="username">
            <div className="bold">
              <span>{name}</span>
            </div>
          </li>
        )}
        <li className={!authedUser ? 'login' : ''}>
          {authedUser ? (
            <div className="bold" onClick={handleClick}>
              <span>Logout</span>
            </div>
          ) : (
            <div>
              <Login/>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};

const mapStateToProps = ({ authedUser, users }) => {
  return {
    authedUser,
    users,
    user: users[authedUser],
  };
};

export default connect(mapStateToProps)(NavBar);
