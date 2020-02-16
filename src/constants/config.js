export const NUMBER_APOD_IMAGES = 3;
export const TIME_CHANGE_SLIDE_APOD = 5000;

export const CUSTOM_CONFIG_LOGIN = {
  LOGIN_BY_EMAIL: true,
  LOGIN_BY_GOOGLE_ACCOUNT: true,
  LOGIN_BY_FACEBOOK_ACCOUNT: false
};

export const MIN_LENGTH_USER_NAME = 6;
export const MAX_LENGTH_USER_NAME = 12;
export const MIN_LENGTH_PASSWORD = 8;
export const MIN_LENGTH_PHONE_NUMBER = 9;

/**
 * from 6 - 12 characters
 * no _ or . at the beginning
 * no __ or _. or ._ or .. inside
 * no _ or . at the end
 * @type {RegExp}
 */
export const USER_NAME_REGEX = /^(?=.{6,12}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/g;

/**
 * allow a-z, A-Z, number, do not allow some of chars #$^+=!*()@%&
 * from 8 - 30 characters
 * @type {RegExp}
 */
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,30}$/g;

/**
 * from 5 to 32 characters in email name
 * has to start by character, not number
 * allow a-z, A-Z, number, '._' for name email
 * domain email name is 1 or 2
 * @type {RegExp}
 */
export const EMAIL_REGEX = /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/g;