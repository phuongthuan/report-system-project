import {
  SET_LOCALE,
  SET_LOCALE_FAILED,
  SET_LOCALE_SUCCEEDED
} from "./constants";

export const setLocale = (lang) => ({
  type: SET_LOCALE,
  lang
});

export const setLocaleSucceeded = (langReceived) => ({
  type: SET_LOCALE_SUCCEEDED,
  langReceived
});

export const setLocaleFailed = (error) => ({
  type: SET_LOCALE_FAILED,
  error
});
