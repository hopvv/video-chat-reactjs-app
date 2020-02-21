import Types from "../constants/types";

export function updateProfile(userData) {
  return {type: Types.UPDATE_PROFILE_REQUEST, ...userData}
}