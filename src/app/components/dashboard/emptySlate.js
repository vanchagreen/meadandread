import React from 'react';
import PropTypes from 'prop-types';
import { Paper, TextField, RaisedButton } from 'material-ui';

import './emptySlate.scss';

export default class EmptySlate extends React.Component {
  getCreateContent = () => {
    return (
      <div>
        <RaisedButton label='Create a book club!' primary={true}/>
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
        <div className='emptyMessage'>Looks like you don't have any book clubs yet!</div>
        <div className='createOrJoin'>
          { this.getCreateContent() }          
          <div className='divider'></div>
          { this.getJoinExistingContent() }
        </div>
      </Paper>
    );
  }
}
