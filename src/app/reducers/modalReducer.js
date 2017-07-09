import * as ActionTypes from '../actions/types';

const initialState = {
  newClubModalIsOpen: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
  case ActionTypes.TOGGLE_CREATE_CLUB_MODAL:
    return {
      ...state,
      newClubModalIsOpen: action.payload
    }
  default:
    return state;
  }
}
