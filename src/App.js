import { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { LoadingBar } from 'react-redux-loading-bar';
import { Route, Routes } from 'react-router-dom';
import { handleInitialData } from './actions/shared';
import NavBar from './components/NavBar';
import Dashboard from './components/Dashboard';
import Poll from './components/Poll';
import NewPoll from './components/NewPoll';
import Leaderboard from './components/Leaderboard';
import { NotFound } from './components/NotFound';
import './App.css';

const App = (props) => {
  useEffect(() => {
    props.dispatch(handleInitialData());
  }, [props]);

  return (
    <Fragment>
      <LoadingBar />
      <NavBar />
      <div className="container">
        {props.loading === true ? null : (
          <Routes>
            <Route exact path="/" element={<Dashboard />} />
            <Route exact path="/questions/:id" element={<Poll />} />
            <Route exact path="/leaderboard" element={<Leaderboard />} />
            <Route exact path="/add" element={<NewPoll />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        )}
      </div>
    </Fragment>
  );
};

const mapStateToProps = ({ authedUser }) => ({
  loading: authedUser === null,
});

export default connect(mapStateToProps)(App);