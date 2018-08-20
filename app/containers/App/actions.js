import { SET_LOCALE } from "./constants";

export const setLocale = (lang) => ({
  type: SET_LOCALE,
  lang
});
