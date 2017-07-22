import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'duckbase';
import * as ModalActions from '../actions/modalActions';
import * as BookActions from '../actions/bookActions';
import ClubInfo from '../components/clubInfo/clubInfoComponent';
import * as BookClubUtils from '../utils/bookClubUtils';

const mapStateToProps = (state, ownProps) => {
  const currentUserId = state.currentUser && state.currentUser.uid;
  const bookClubId = ownProps.match.params.clubId;
  const bookClub = BookClubUtils.getBookClub(state, bookClubId);

  return {
    bookClub,
    bookClubId,
    currentUserId
  };
};

const mapPropsToPaths = (props) => [`bookClub/${props.bookClubId}`];

export default compose(
  connect(mapStateToProps),
  firebaseConnect(mapPropsToPaths)
)(ClubInfo);
