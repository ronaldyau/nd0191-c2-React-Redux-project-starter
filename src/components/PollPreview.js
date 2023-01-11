import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../utils/helpers';
import Authenticate from './Authenticate';
import avatar from '../static/avatar.png';

export const PollPreview = ({ question, user, id }) => {
  return (
    <div className="poll-preview">
      <Authenticate />
      <div>
        <img alt={user.name} className="user-avatar" src={avatar} />
        <span className="user">{user.name}</span>
      </div>
      <div>
        <span className="timestamp">{formatDate(question.timestamp)}</span>
      </div>
      <div>
        <Link to={`/questions/${id}`}>
          <button>Show</button>
        </Link>
      </div>
    </div>
  );
};