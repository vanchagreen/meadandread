import * as FirebaseUtils from './firebaseUtils';

export function getBookClubId(state) {
  const currentUserId = state.currentUser && state.currentUser.uid;
  return FirebaseUtils.convertMapToList(state.firebase, `/users/${currentUserId}/bookClubs`) || '';
}
