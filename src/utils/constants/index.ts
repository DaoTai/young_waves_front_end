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

export const GET_OWNER_POSTS = "GET_OWNER_POSTS";
export const GET_OWNER_POSTS_SUCCESS = `${GET_OWNER_POSTS}_SUCCESS`;
export const GET_OWNER_POSTS_FAILURE = `${GET_OWNER_POSTS}_FAILURE`;

export const CREATE_OWNER_POST = "CREATE_OWNER_POST";
export const CREATE_OWNER_POST_SUCCESS = `${CREATE_OWNER_POST}_SUCCESS`;
export const CREATE_OWNER_POST_FAILURE = `${CREATE_OWNER_POST}_FAILURE`;

export const UPDATE_POST = "UPDATE_POST";
export const UPDATE_POST_SUCCESS = `${UPDATE_POST}_SUCCESS`;
export const UPDATE_POST_FAILURE = `${UPDATE_POST}_FAILURE`;

export const GET_POSTS = "GET_POSTS";
export const GET_POSTS_SUCCESS = `${GET_POSTS}_SUCCESS`;
export const GET_POSTS_FAILURE = `${GET_POSTS}_FAILURE`;

export const DELETE_POST = "DELETE_POST";
export const DELETE_POST_SUCCESS = `${DELETE_POST}_SUCCESS`;
export const DELETE_POST_FAILURE = `${DELETE_POST}_FAILURE`;

export const CREATE_POST = "CREATE_POST";
export const CREATE_POST_SUCCESS = `${CREATE_POST}_SUCCESS`;
export const CREATE_POST_FAILURE = `${CREATE_POST}_FAILURE`;

export const GET_TRASH_POSTS = "GET_TRASH_POSTS";
export const GET_TRASH_POSTS_SUCCESS = `${GET_TRASH_POSTS}_SUCCESS`;
export const GET_TRASH_POSTS_FAILURE = `${GET_TRASH_POSTS}_FAILURE`;

export const GET_TRASH_POST = "GET_TRASH_POST";
export const GET_TRASH_POST_SUCCESS = `${GET_TRASH_POST}_SUCCESS`;
export const GET_TRASH_POST_FAILURE = `${GET_TRASH_POST}_FAILURE`;

export const FORCE_DELETE_POST = "FORCE_DELETE_POST";
export const FORCE_DELETE_POST_SUCCESS = `${FORCE_DELETE_POST}_SUCCESS`;
export const FORCE_DELETE_POST_FAILURE = `${FORCE_DELETE_POST}_FAILURE`;

export const RESTORE_POST = "RESTORE_POST";
export const RESTORE_POST_SUCCESS = `${RESTORE_POST}_SUCCESS`;
export const RESTORE_POST_FAILURE = `${RESTORE_POST}_FAILURE`;

export const CREATE_COMMENT = "CREATE_COMMENT";
export const CREATE_COMMENT_SUCCESS = `${CREATE_COMMENT}_SUCCESS`;
export const CREATE_COMMENT_FAILURE = `${CREATE_COMMENT}_FAILURE`;

export const CREATE_LIKE = "CREATE_LIKE";
export const CREATE_LIKE_SUCCESS = `${CREATE_LIKE}_SUCCESS`;
export const CREATE_LIKE_FAILURE = `${CREATE_LIKE}_FAILURE`;

export const GET_ALL_USER = "GET_ALL_USER";
export const GET_ALL_USER_SUCCESS = `${GET_ALL_USER}_SUCCESS`;
export const GET_ALL_USER_FAILURE = `${GET_ALL_USER}_FAILURE`;

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
   trashPosts: {
      isLoading: false,
      payload: {
         status: 0,
         posts: [],
         currentPage: 0,
         maxPage: 0,
      },
   },
   users: {
      isLoading: false,
      payload: {
         data: [],
         status: 0,
      },
   },
   modalRef: {
      handleOpen: () => {},
      handleClose: () => {},
      images: [],
      post: "",
      status: "",
      setImages: () => {},
      setPost: () => {},
      setStatus: () => {},
   },
};

// For action redux
