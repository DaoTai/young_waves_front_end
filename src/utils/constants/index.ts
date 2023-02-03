// For validate
export const REQUIRED_MSG = "Please fill out this field";
export const LENGTH_PASSWORD = 6;

// For spinner
export const SHOW_SPINNER = "SHOW_SPINNER";
export const HIDE_SPINNER = "HIDE_SPINNER";

// For REDUX-SAGA
export const SIGN_IN = "SIGN_IN";
export const SIGN_IN_SUCCESS = `${SIGN_IN}_SUCCESS`;
export const SIGN_IN_FAILURE = `${SIGN_IN}_FAILURE`;

// For init state
export const INIT_STATE = {
   spinner: { isShow: false },
   signIn: {
      isLoading: false,
      payload: {},
   },
};
