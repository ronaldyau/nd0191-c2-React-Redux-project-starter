export const RECEIVE_USERS = 'RECEIVE_USERS';
export const SAVE_QUESTION_TO_USER = 'SAVE_QUESTION_TO_USER';
export const SAVE_ANSWER_TO_USER = 'SAVE_ANSWER_TO_USER';

export const receiveUsers = (users) => {
  return {
    type: RECEIVE_USERS,
    users,
  };
};

export const saveQuestionToUser = (question) => {
  return {
    type: SAVE_QUESTION_TO_USER,
    question,
  };
};

export const saveAnswerToUser = ({ id, answer, authedUser }) => {
  return {
    type: SAVE_ANSWER_TO_USER,
    id,
    answer,
    authedUser,
  };
};