import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'duckbase';
import Dashboard from '../components/dashboard/dashboardComponent';
import * as BookClubUtils from '../utils/bookClubUtils';

const mapStateToProps = (state) => {
  const currentUserId = state.currentUser && state.currentUser.uid;
  const bookClubIds = BookClubUtils.getBookClubIds(state);

  return {
    bookClubIds,
    currentUserId
  };
};

const mapPropsToPaths = (props) => {
  return Object.keys(props.bookClubIds).reduce((acc, bookClubId) => {
    return acc.concat(`users/${props.currentUserId}/bookClubs/${bookClubId}`);
  }, []);
};

export default compose(
  connect(mapStateToProps),
  firebaseConnect(mapPropsToPaths),
)(Dashboard);
