import React from 'react';
import PropTypes from 'prop-types';

import './clubInfo.scss';

export default class ClubInfo extends React.Component {
  static propTypes = {
    bookClub: PropTypes.object.isRequired
  };

  render() {
    const bookClub = this.props.bookClub;
    return (
      <div className='clubInfo'>
        <div>{bookClub.name}</div>
        <div>Invite Code: {bookClub.inviteCode}</div>
      </div>
    );
  }
}
