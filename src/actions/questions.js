import { saveQuestion, saveQuestionAnswer } from '../utils/api';
import { saveQuestionToUser, saveAnswerToUser } from './users';

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ADD_QUESTION = 'ADD_QUESTION';
export const ANSWER_QUESTION = 'ANSWER_QUESTION';

export const receiveQuestions = (questions) => {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
};

export const answerQuestion = ({ qid, answer, authedUser }) => {
  return {
    type: ANSWER_QUESTION,
    qid,
    answer,
    authedUser,
  };
};

export const addQuestion = (question) => {
  return {
    type: ADD_QUESTION,
    question,
  };
};

export const handleAddQuestion = ({ optionOneText, optionTwoText }) => {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    return saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser,
    })
      .then((question) => {
        dispatch(addQuestion(question));
        dispatch(saveQuestionToUser(question));
      })
      .catch((error) => {
        console.error('Error adding question: ' + error);
      });
  };
};

export const handleAnswer = (qid, answer) => {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    return saveQuestionAnswer({
      qid,
      answer,
      authedUser,
    }).then(() => {
      dispatch(answerQuestion({ qid, answer, authedUser }));
      dispatch(saveAnswerToUser({ qid, answer, authedUser }));
    });
  };
};