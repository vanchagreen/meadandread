import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'duckbase';
import * as ModalActions from '../actions/modalActions';
import * as BookActions from '../actions/bookActions';
import Dashboard from '../components/dashboard/dashboardComponent';
import * as BookClubUtils from '../utils/bookClubUtils';

const mapStateToProps = (state) => {
  const currentUserId = state.currentUser && state.currentUser.uid;
  const bookClubIds = BookClubUtils.getBookClubIds(state);
  const bookClubs = BookClubUtils.getBookClubs(state);

  return {
    bookClubs,
    bookClubIds,
    currentUserId,
    newClubModalIsOpen: state.modal.newClubModalIsOpen
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createNewClub: (clubInfo) => dispatch(BookActions.createBookClub(clubInfo)),
    toggleCreateClubModal: (isOpen) => dispatch(ModalActions.toggleCreateClubModal(isOpen)),
    joinTheClub: (inviteCode) => dispatch(BookActions.joinTheClub(inviteCode))
  };
};

const mapPropsToPaths = (props) => {
  return Object.keys(props.bookClubIds).reduce((acc, bookClubId) => {
    return acc.concat(`bookClub/${bookClubId}`);
  }, []);
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firebaseConnect(mapPropsToPaths),
)(Dashboard);
