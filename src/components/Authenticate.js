import { useNavigate, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { useEffect } from 'react';

const Authenticate = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isAuthenticated = props.isAuthenticated;
    if (!isAuthenticated) {
      navigate('/', { state: { location: location.pathname } });
    }
  }, [props.isAuthenticated, location?.pathname, navigate]);
};

const mapStateToProps = ({ authedUser }) => {
  return {
    isAuthenticated: !!authedUser,
  };
};

export default connect(mapStateToProps)(Authenticate);