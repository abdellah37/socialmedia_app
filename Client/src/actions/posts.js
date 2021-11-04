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
import * as api from "../api";

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPosts(page);
    console.log(data);

    dispatch({ type: FETCH_ALL, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPost(id);
    console.log("data f action get post", data);

    dispatch({ type: FETCH_POST, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  console.log("notre search query", searchQuery);
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchPostsBySearch(searchQuery);

    console.log("datadteb", data);

    dispatch({ type: SELECTED_POSTS, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (post, page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    console.log("page action", page);
    console.log("postaction", post);

    const { data } = await api.createPost(post);


    dispatch({ type: CREATE, payload: data });

    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

export const createComment = (value, id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createComment(value, id);
    console.log("maymknch", data);
    dispatch({ type: CREATE_COMMENT, payload: data });
    dispatch({ type: END_LOADING });
    return data.comments;
  } catch (error) {
    console.log(error.message);
  }
};

export const updatePost = (id, postdata) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, postdata);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);

    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
