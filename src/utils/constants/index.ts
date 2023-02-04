// For validate
export const REQUIRED_MSG = "Please fill out this field";
export const LENGTH_PASSWORD = 6;

// For time
export const TIME_ALERT = 5000;

// For REDUX-SAGA
export const SIGN_IN = "SIGN_IN";
export const SIGN_IN_SUCCESS = `${SIGN_IN}_SUCCESS`;
export const SIGN_IN_FAILURE = `${SIGN_IN}_FAILURE`;
export const SIGN_UP = "SIGN_UP";
export const SIGN_UP_SUCCESS = `${SIGN_UP}_SUCCESS`;
export const SIGN_UP_FAILURE = `${SIGN_UP}_FAILURE`;
export const GET_PROFILE = "GET_PROFILE";
export const GET_PROFILE_SUCCESS = `${GET_PROFILE}_SUCCESS`;
export const GET_PROFILE_FAILURE = `${GET_PROFILE}_FAILURE`;
export const UPDATE_PROFILE = "UPDATE_PROFILE";
export const UPDATE_PROFILE_SUCCESS = `${UPDATE_PROFILE}_SUCCESS`;
export const UPDATE_PROFILE_FAILURE = `${UPDATE_PROFILE}_FAILURE`;
// For init state
export const INIT_STATE = {
   signUp: {
      isLoading: false,
      payload: {},
   },
   signIn: {
      isLoading: false,
      payload: {},
   },
   profile: {
      isLoading: false,
      payload: {},
   },
};

// For action redux
