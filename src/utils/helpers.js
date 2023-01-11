import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import avatar from '../static/avatar.png';

export const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const time = date.toLocaleTimeString('en-US');
  return time.substr(0, 5) + time.slice(-2) + ' | ' + date.toLocaleDateString();
};

export const formatPoll = (question, author, authedUser) => {
  let hasAnswered = false;
  let isAuthor = false;
  let selectedVote = '';

  const {
    id,
    optionOne: {
      votes: [],
      text: optionOneText,
    },
    optionTwo: {
      votes: [],
      text: optionTwoText,
    },
    timestamp,
  } = question;

  if (question.optionOne.votes.includes(authedUser)) {
    selectedVote = question.optionOne.text;
  } else if (question.optionTwo.votes.includes(authedUser)) {
    selectedVote = question.optionTwo.text;
  }
  hasAnswered = !!selectedVote;

  if (author === authedUser) {
    isAuthor = true;
  }

  const optionOneVotes = question.optionOne.votes.length;
  const optionTwoVotes = question.optionTwo.votes.length;
  const totalVotes = optionOneVotes + optionTwoVotes;

  const optionOnePercentage = Math.round((optionOneVotes / totalVotes) * 100);
  const optionTwoPercentage = Math.round((optionTwoVotes / totalVotes) * 100);

  return {
    id,
    timestamp,
    name: author.name,
    avatarURL: author.avatarURL ?? avatar,
    optionOneText,
    optionTwoText,
    hasAnswered,
    selectedVote,
    isAuthor,
    totalVotes,
    optionOnePercentage,
    optionTwoPercentage,
  };
};

export const withRouter = (Component) => {
  const ComponentWithRouterProp = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  };

  return ComponentWithRouterProp;
};