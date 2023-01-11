import { _saveQuestion, _saveQuestionAnswer } from '../utils/_DATA';


// For the _DATA.js file, write an async unit test for _saveQuestion 
// to verify that the saved question is returned and all expected fields are populated when correctly formatted data is passed to the function.

describe('api', () => {
    describe('_saveQuestion', () => {
        test('should return the saved question and all expected fields are populated', async () => {
          const question = {
            optionOneText: 'Option A',
            optionTwoText: 'Option B',
            author: 'Some Person',
          };
      
          const response = await _saveQuestion(question);
          expect(response).toMatchSnapshot({
            author: 'Some Person',
            id: expect.any(String),
            optionOne: { text: 'Option A' },
            optionTwo: { text: 'Option B' },
            timestamp: expect.any(Number),
          });
        });
      
        it('should return error when incorrect arguments are received', async () => {
          const question = {
            optionOneText: undefined,
            optionTwoText: undefined,
            author: 'jsmith',
          };
      
          await expect(_saveQuestion(question)).rejects.toMatchSnapshot();
        });
    });
      
    describe('_saveQuestionAnswer', () => {
        it('should return true when correct arguments are received', async () => {
          const authedUser = 'sarahedo';
          const qid = '6ni6ok3ym7mf1p33lnez';
          const answer = 'optionOne';
      
          const response = await _saveQuestionAnswer({ authedUser, qid, answer });
      
          expect(response).toBeTruthy();
        });
      
        it('should return an error if incorrect arguments are received', async () => {
          const authedUser = 'jsmith';
          const qid = undefined;
          const answer = undefined;
      
          await expect(_saveQuestionAnswer({ authedUser, qid, answer })).rejects.toMatchSnapshot();
        });
      });
})


