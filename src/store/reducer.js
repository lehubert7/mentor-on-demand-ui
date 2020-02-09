import { Constant } from "../constants/AppConstants";

const initialState = {
  userId: null
};

export function rootReducer(state = initialState, action) {
  switch(action.type) {
    case Constant.SET_USERID : return {
      userId: action.payload.userId
    };
    default :
      return state;
  }
};
