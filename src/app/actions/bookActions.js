import * as ActionTypes from './types';
import * as BookClubUtils from '../utils/bookClubUtils';

export function createBookClub(bookClubObj) {
  return async (dispatch, getState) => {
    const userId = getState().currentUser.uid;
    const newBookClub = {
      ...bookClubObj,
      admins: {
        [userId]: true
      },
      inviteCode: 'somethingsecret' + Math.random(10),
      users: {
        [userId]: true
      }
    };
    const clubId = await BookClubUtils.addBookClub(newBookClub);
    return BookClubUtils.addBookClubForUser(clubId, userId);
  };
}
