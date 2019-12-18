import Types from "../constants/types";

export function login(email, password) {
  return {type: Types.LOGIN_REQUEST, email, password}
}

export function loginGoogleAccount() {
  return {type: Types.LOGIN_GOOGLE_ACCOUNT_REQUEST}
}

export function logout() {
  return {type: Types.LOGOUT_REQUEST}
}

export function verify(userId) {
  return {type: Types.VERIFY_SUCCESS}
}