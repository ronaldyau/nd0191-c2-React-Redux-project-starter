import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import 'react-tabs/style/react-tabs.css';
import Authenticate from "./Authenticate";
import { connect } from "react-redux";
import { PollPreview } from "./PollPreview";

const Dashboard = ({ answered, unanswered, users }) => {
  return (
    <>
      <Authenticate />
      <Tabs>
        <TabList>
          <Tab>Unanswered</Tab>
          <Tab>Answered</Tab>
        </TabList>
        <TabPanel>
          <div>
            <h3>Unanswered Questions</h3>
            {unanswered.length
              ? unanswered.map((question) => {
                  return (
                    <PollPreview
                      key={question.id}
                      id={question.id}
                      question={question}
                      user={users[question.author]}
                    />
                  );
                })
              : ""}
          </div>
        </TabPanel>
        <TabPanel>
          <div>
            <h3>Answered Questions</h3>
            {answered.length
              ? answered.map((question) => {
                  return (
                    <PollPreview
                      key={question.id}
                      id={question.id}
                      question={question}
                      user={users[question.author]}
                    />
                  );
                })
              : ""}
          </div>
        </TabPanel>
      </Tabs>
    </>
  );
};

const mapStateToProps = ({ authedUser, questions, users }) => {
  const polls = Object.keys(questions).map((question) => questions[question]);
  const answered = polls
    .filter(
      (question) =>
        question.optionOne.votes.includes(authedUser) ||
        question.optionTwo.votes.includes(authedUser)
    )
    .sort((a, b) => b.timestamp - a.timestamp);

    const unanswered = polls
    .filter((question) => !answered.includes(question))
    .sort((a, b) => b.timestamp - a.timestamp);

  return {
    questions,
    answered,
    unanswered,
    users,
  };
};

export default connect(mapStateToProps)(Dashboard);
