import React from 'react';
import PropTypes from 'prop-types';
import { Paper, TextField, RaisedButton } from 'material-ui';

import './createOrJoin.scss';

export default class CreateOrJoin extends React.Component {
  static propTypes = {
    toggleCreateClubModal: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      clubCode: ''
    };
  }

  joinTheClub = () => {
    this.props.joinTheClub(this.state.clubCode);
    this.setState({ clubCode: '' });
  }

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
        <TextField floatingLabelText='Book Club Code' onChange={e => this.setState({ clubCode: e.target.value })} value={this.state.clubCode} />
        <RaisedButton label='Join' primary={true} onTouchTap={() => this.joinTheClub()} style={style} />
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
