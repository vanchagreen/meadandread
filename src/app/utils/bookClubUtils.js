import * as FirebaseUtils from './firebaseUtils';

export function addBookClub(newBookClub) {
  const response = FirebaseUtils.firebaseDb.ref(`bookClub`).push(newBookClub);
  return response.key;
}

export function addBookClubForUser(clubId, userId) {
  return FirebaseUtils.firebaseDb.ref(`users/${userId}/bookClubs/${clubId}`).set(true);  
}

export function getBookClubs(state) {
  return FirebaseUtils.getValue(state.firebase, `/bookClub`) || {};
}

export function getBookClubIds(state) {
  const currentUserId = state.currentUser && state.currentUser.uid;
  return FirebaseUtils.getValue(state.firebase, `/users/${currentUserId}/bookClubs`) || {};
}

export function nextUpcomingBook(selectedBookList) {
  const today = new Date();
  const futureBookIds = Object.keys(selectedBookList).filter(bookId => {
    return selectedBookList[bookId].dueDate > today.getTime();
  });

  let smallestDateWindow = selectedBookList[futureBookIds[0]].dueDate;
  let smallestDateWindowBookId = futureBookIds[0];

  for (const bookId of futureBookIds) {
    if (selectedBookList[bookId].dueDate - today.getDate() < smallestDateWindow) {
      smallestDateWindow = selectedBookList[bookId].dueDate;
      smallestDateWindowBookId = bookId;
    }
  }

  return selectedBookList[smallestDateWindowBookId];
}
