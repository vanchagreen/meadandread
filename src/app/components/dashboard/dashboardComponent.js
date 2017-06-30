import React from 'react';
import PropTypes from 'prop-types';
import EmptySlate from './emptySlate';

export default class Dashboard extends React.Component {
  static propTypes = {
    bookClubIds: PropTypes.object.isRequired,
    currentUserId: PropTypes.string.isRequired
  };

  getBookClubList = () => {
    return (
      <div>
        So many book clubs! Yay!
      </div>
    )
  }

  render () {
    return (
      <div>
        { Object.keys(this.props.bookClubIds).length ? this.getBookClubList() : <EmptySlate /> }
      </div>
    );
  }
}
