import {
  LIKE,
  DELETE,
  UPDATE,
  FETCH_ALL,
  CREATE,
  SELECTED_POSTS,
  START_LOADING,
  END_LOADING,
  FETCH_POST,
  CREATE_COMMENT,
} from "../constantes/actionTypes";

export default (state = { isLoading: true, posts: [] }, action) => {
  switch (action.type) {
    case FETCH_POST:
      return { ...state, post: action.payload };
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case SELECTED_POSTS:
      return { ...state, posts: action.payload.data };
    case LIKE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case DELETE:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id != action.payload),
      };
    case UPDATE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case CREATE:
      return {
        ...state,
        posts: action.payload.data,
      };

    case CREATE_COMMENT:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    default:
      return state;
  }
};
