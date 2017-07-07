import * as FirebaseUtils from './firebaseUtils';

export function getBookClubIds(state) {
  const currentUserId = state.currentUser && state.currentUser.uid;
  return FirebaseUtils.getValue(state.firebase, `/users/${currentUserId}/bookClubs`) || {};
}
