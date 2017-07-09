import * as ActionTypes from './types';
import * as BookClubUtils from '../utils/bookClubUtils';

export function toggleCreateClubModal(isOpen) {
  return {
    type: ActionTypes.TOGGLE_CREATE_CLUB_MODAL,
    payload: isOpen
  };
}
