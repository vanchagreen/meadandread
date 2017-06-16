import * as ActionTypes from '../actions/types';

export default function (state = null, action) {
  switch (action.type) {
  case ActionTypes.FETCH_FIREBASE_USER:
  case ActionTypes.LOGOUT_FIREBASE_USER:
  case ActionTypes.REGISTER_FIREBASE_USER:
  case ActionTypes.LOGIN_FIREBASE_USER:
  case ActionTypes.UPDATE_FIREBASE_USER:
  case ActionTypes.CHANGE_FIREBASE_USER_PASSWORD:
  case ActionTypes.FIREBASE_PASSWORD_RESET_EMAIL:
  case ActionTypes.LOGIN_WITH_PROVIDER_FIREBASE:
    return action.payload;
  default:
    return state;
  }
}
