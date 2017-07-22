import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, Paper, RaisedButton, TextField } from 'material-ui';
import createHashHistory from 'history/createHashHistory'
import CreateOrJoin from './createOrJoin';
import * as BookClubUtils from '../../utils/bookClubUtils';

import './dashboard.scss';

const history = createHashHistory();

export default class Dashboard extends React.Component {
  static propTypes = {
    bookClubs: PropTypes.object,
    bookClubIds: PropTypes.object.isRequired,
    currentUserId: PropTypes.string.isRequired,
    newClubModalIsOpen: PropTypes.bool.isRequired,
    toggleCreateClubModal: PropTypes.func.isRequired,
    joinTheClub: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };
  }

  createNewClub = () => {
    this.props.createNewClub(this.state);
    this.handleModalClose();
  };

  handleModalClose = () => {
    this.props.toggleCreateClubModal(false);
  };

  getCreateClubModal = () => {
    const actions = [
      <RaisedButton
        label='Close'
        onTouchTap={this.handleModalClose}
      />,
      <RaisedButton
        label='Create'
        primary={true}
        onTouchTap={() => this.createNewClub()}
      />
    ];

    return (
      <div>
        <Dialog
          title='Create A Book Club'
          actions={actions}
          className='createNewClubModal'
          bodyClassName='createNewClubModalContent'
          modal={false}
          open={this.props.newClubModalIsOpen}
          onRequestClose={this.handleModalClose}
        >
          <div>
            <TextField floatingLabelText='Name' name='clubName' onChange={e => this.setState({ name: e.target.value })} value={this.state.name} />
          </div>
        </Dialog>
      </div>
    );
  }

  getBookClubList = () => {
    return Object.keys(this.props.bookClubs).map((clubId) => {
      const club = this.props.bookClubs[clubId];
      const nextUpcomingBook = club.selectedBooks && BookClubUtils.nextUpcomingBook(club.selectedBooks);
      return (
        <Paper className='bookClubPaper' key={clubId} onTouchTap={() => history.push(`/club/${clubId}`)}>
          <div>{club.name}</div>
          <div>{nextUpcomingBook ? nextUpcomingBook.isbn : 'No book selected yet'}</div>
        </Paper>
      );
    });
  }

  render() {
    return (
      <div>
        {this.getCreateClubModal()}
        <div className='bookClubList'>{this.props.bookClubs && this.getBookClubList()}</div>
        <CreateOrJoin toggleCreateClubModal={this.props.toggleCreateClubModal} joinTheClub={this.props.joinTheClub} />
      </div>
    );
  }
}
