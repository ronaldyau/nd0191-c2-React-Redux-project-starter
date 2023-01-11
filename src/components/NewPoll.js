import React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import { handleAddQuestion } from '../actions/questions';
import { useNavigate } from 'react-router-dom';
import Authenticate from './Authenticate';

const NewPoll = ({ dispatch, authedUser }) => {
  let navigate = useNavigate();

  const [optionOne, setOptionOne] = useState('');
  const [optionTwo, setOptionTwo] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (optionOne !== '' && optionTwo !== '') {
      const question = {
        optionOneText: optionOne,
        optionTwoText: optionTwo,
      };
      dispatch(handleAddQuestion(question));
      setSuccess(true);
      setError(false);
    } else {
      setSuccess(false);
      setError(true);
    }

    setOptionOne('');
    setOptionTwo('');

    setTimeout(function () {}, 5000);

    navigate('/');
  };

  const handleChangeOptionOne = (e) => {
    setOptionOne(e.target.value);
  };

  const handleChangeOptionTwo = (e) => {
    setOptionTwo(e.target.value);
  };

  return (
    <div className="new-poll">
      <Authenticate />
      {success && (
        <h1 data-testid="success-header" className={'Success'}>
          New poll created
        </h1>
      )}
      {error && (
        <h1 data-testid="error-header" className={'Error'}>
          Please enter required properties
        </h1>
      )}
      <h1>New Poll</h1>
      <h2>Would you rather</h2>
      <form name="poll-form" className="new-poll">
        <label className="selection-one-label" htmlFor="optionOneValue">
          Option One
          <input
            data-testid="option-one-input"
            placeholder="Enter first option"
            onChange={handleChangeOptionOne}
            value={optionOne}
            name="optionOneValue"
            disabled={success}
          ></input>
        </label>
        <label className="selection-two-label" htmlFor="optionTwoValue">
          Option Two
          <input
            data-testid="option-two-input"
            placeholder="Enter second option"
            onChange={handleChangeOptionTwo}
            value={optionTwo}
            name="optionTwoValue"
            disabled={success}
          ></input>
        </label>
        <button disabled={success} data-testid="submit-button" type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = ({ authedUser }) => {
  return { authedUser };
};

export default connect(mapStateToProps)(NewPoll);