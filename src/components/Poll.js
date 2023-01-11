import React from 'react';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { handleAnswer } from '../actions/questions';
import { formatPoll, withRouter } from '../utils/helpers';
import Authenticate from './Authenticate';
import defaultAvatar from '../static/avatar.png';

const Poll = ({ question, dispatch, id }) => {
  const navigate = useNavigate();

  if (!question) {
    return (
      <div className="question-not-found">
        <p>Question not found</p>
        <Link to="/">
          <button>Go Home</button>
        </Link>
      </div>
    );
  }

  const {
    name,
    avatarURL,
    optionOneText,
    optionTwoText,
    hasAnswered,
    selectedVote,
    totalVotes,
    optionOnePercentage,
    optionTwoPercentage,
  } = question;

  const handleClick = (option) => {
    dispatch(handleAnswer(id, option));
    navigate(`/questions/${id}`);
  };

  return (
    <div className="polls-option">
      <Authenticate />
      <div>
        <img alt="user-avatar" className="user-avatar" src={avatarURL ?? defaultAvatar} />
        <h1 className="user-asks">{name} asks</h1>
      </div>
      <div>
        {!hasAnswered ? (
          <div>
            <h4>Would you rather</h4>
            <button onClick={() => handleClick('optionOne')}>{optionOneText}</button> or
            <button onClick={() => handleClick('optionTwo')}>{optionTwoText}</button>
          </div>
        ) : (
          <div className="answered-question-poll">
            <span>You voted</span>
            <button className="btn-disabled" disabled>{selectedVote}</button>
            <hr />
            <h3>Vote Status:</h3>
            <div className="percentage-poll">
              <div className="percentage-poll-option-one">
                <button name="optionOneButton" className="btn-disabled">
                  {optionOneText}
                </button>
                <span>{optionOnePercentage}%</span>
              </div>
              <div className="percentage-poll-option-two">
                <button name="optionTwoButton" className="btn-disabled">
                  {optionTwoText}
                </button>
                <span>{optionTwoPercentage}%</span>
              </div>
            </div>
            <hr />
            <span>{totalVotes} Total Votes</span>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ authedUser, users, questions }, props) => {
  const { id } = props.router.params;
  const question = questions[id];

  return {
    authedUser,
    id,
    question: question ? formatPoll(question, users[question.author], authedUser) : null,
  };
};

export default withRouter(connect(mapStateToProps)(Poll));