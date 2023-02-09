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
export const SIGN_OUT = "SIGN_OUT";
export const SIGN_OUT_SUCCESS = `${SIGN_OUT}_SUCCESS`;
export const SIGN_OUT_FAILURE = `${SIGN_OUT}_FAILURE`;
export const GET_PROFILE = "GET_PROFILE";
export const GET_PROFILE_SUCCESS = `${GET_PROFILE}_SUCCESS`;
export const GET_PROFILE_FAILURE = `${GET_PROFILE}_FAILURE`;
export const UPDATE_PROFILE = "UPDATE_PROFILE";
export const UPDATE_PROFILE_SUCCESS = `${UPDATE_PROFILE}_SUCCESS`;
export const UPDATE_PROFILE_FAILURE = `${UPDATE_PROFILE}_FAILURE`;
export const CHANGE_PASSWORD_PROFILE = "CHANGE_PASSWORD_PROFILE";
export const CHANGE_PASSWORD_PROFILE_SUCCESS = `${CHANGE_PASSWORD_PROFILE}_SUCCESS`;
export const CHANGE_PASSWORD_PROFILE_FAILURE = `${CHANGE_PASSWORD_PROFILE}_FAILURE`;
export const GET_POST = "GET_POST";
export const GET_POST_SUCCESS = `${GET_POST}_SUCCESS`;
export const GET_POST_FAILURE = `${GET_POST}_FAILURE`;
export const GET_POSTS = "GET_POSTS";
export const GET_POSTS_SUCCESS = `${GET_POSTS}_SUCCESS`;
export const GET_POSTS_FAILURE = `${GET_POSTS}_FAILURE`;
export const UPDATE_POST = "UPDATE_POST";
export const UPDATE_POST_SUCCESS = `${UPDATE_POST}_SUCCESS`;
export const UPDATE_POST_FAILURE = `${UPDATE_POST}_FAILURE`;
export const DELETE_POST = "DELETE_POST";
export const DELETE_POST_SUCCESS = `${DELETE_POST}_SUCCESS`;
export const DELETE_POST_FAILURE = `${DELETE_POST}_FAILURE`;
export const CREATE_POST = "CREATE_POST";
export const CREATE_POST_SUCCESS = `${CREATE_POST}_SUCCESS`;
export const CREATE_POST_FAILURE = `${CREATE_POST}_FAILURE`;
export const CREATE_COMMENT = "CREATE_COMMENT";
export const CREATE_COMMENT_SUCCESS = `${CREATE_COMMENT}_SUCCESS`;
export const CREATE_COMMENT_FAILURE = `${CREATE_COMMENT}_FAILURE`;
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
   signOut: {
      isLoading: false,
      payload: "",
   },
   profile: {
      isLoading: false,
      payload: {},
   },
   posts: {
      isLoading: false,
      payload: {
         status: 0,
         data: [],
      },
   },
   post: {
      isLoading: false,
      payload: {
         data: {
            post: {},
            comments: [],
         },
      },
   },
};

// For action redux
