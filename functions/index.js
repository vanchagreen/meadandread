// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

// CREATING: event.data._newData && event.data._data == null
// UPDATING: event.data._newData && event.data._newData
// DELETING: event.data._newData == null

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.createNewUser = functions.auth.user().onCreate(event => {
  const uid = event.data.uid;
  const email = event.data.email;

  return admin.database().ref(`/users/${uid}`).set({ email });
});

exports.joinTheClub = functions.database.ref('/queues/joinTheClub/tasks/{taskId}').onWrite(event => {
  if (event.data._newData) {
    const { inviteCode, userId } = event.data._newData;

    return admin.database().ref('bookClub').orderByChild('inviteCode').equalTo(inviteCode).once('value').then((response) => {
      if (response.exists() && response.val()) {
        const val = response.val();
        const bookClubId = Object.keys(val)[0];
        const bookClubName = Object.keys(val)[0].name;
        const randomId = Math.random().toString(36).slice(-10);

        const updates = {
          [`bookClub/${bookClubId}/users/${userId}`]: true,
          [`users/${userId}/bookClubs/${bookClubId}`]: true,
          [`queues/joinTheClub/tasks/${event.params.taskId}`]: null,
          [`users/${userId}/notifications/${randomId}`]: { message: `You were successfully added to ${bookClubName}` }
        };
        return admin.database().ref().update(updates);
      } else {
        admin.database().ref('queues/joinTheClub/tasks').child(event.params.taskId).remove();
        return admin.database().ref(`users/${userId}/notifications`).push({ message: 'The invite code you submitted didn\'t work' });
      }
    });
  }
});
