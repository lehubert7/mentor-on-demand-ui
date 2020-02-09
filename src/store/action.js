import { Constant } from "../constants/AppConstants";

export function setUserId(userId) {
  return {
    type: Constant.SET_USERID,
    payload: {
      userId
    }
  }
};
