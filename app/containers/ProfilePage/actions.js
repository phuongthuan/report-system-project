import {
  GET_USER_PROFILE, GET_USER_PROFILE_FAILED, GET_USER_PROFILE_SUCCEEDED, UPDATE_USER_PROFILE,
  UPDATE_USER_PROFILE_FAILED, UPDATE_USER_PROFILE_SUCCEEDED
} from "./constants";

/*===========================================
 GET USER PROFILE
 ===========================================*/
export const getUserProfile = (id) => ({
  type: GET_USER_PROFILE,
  id
});

export const getUserProfileSucceeded = (profileReceived) => ({
  type: GET_USER_PROFILE_SUCCEEDED,
  profileReceived
});

export const getUserProfileFailed = (error) => ({
  type: GET_USER_PROFILE_FAILED,
  error
});

/*===========================================
 UPDATE PROFILE
 ===========================================*/
export const updateProfile = (profileUpdated) => ({
  type: UPDATE_USER_PROFILE,
  profileUpdated
});

export const updateProfileSucceeded = (profileUpdatedReceived) => ({
  type: UPDATE_USER_PROFILE_SUCCEEDED,
  profileUpdatedReceived
});

export const updateProfileFailed = (error) => ({
  type: UPDATE_USER_PROFILE_FAILED,
  error
});


