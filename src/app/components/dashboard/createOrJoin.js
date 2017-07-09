import React from 'react';
import PropTypes from 'prop-types';
import { Paper, TextField, RaisedButton } from 'material-ui';

import './createOrJoin.scss';

export default class CreateOrJoin extends React.Component {
  static propTypes = {
    toggleCreateClubModal: PropTypes.func.isRequired
  };

  getCreateContent = () => {
    return (
      <div>
        <RaisedButton label='Create a book club!' onTouchTap={() => this.props.toggleCreateClubModal(true)} primary={true}/>
      </div>
    )
  }

  getJoinExistingContent = () => {
    const style = { margin: 12 };
    return (
      <div>
        <div>Join an existing one </div>
        <TextField floatingLabelText='Book Club Code' />
        <RaisedButton label='Join' primary={true} style={style} />
      </div>
    );
  }

  render () {
    return (
      <Paper className='emptySlate'>
        <div className='createOrJoin'>
          { this.getCreateContent() }          
          <div className='divider'></div>
          { this.getJoinExistingContent() }
        </div>
      </Paper>
    );
  }
}
