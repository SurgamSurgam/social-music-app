import { RECEIVE_ALL_SONGS } from "./actionTypes.js";
import { RECEIVE_ALL_COMMENTS } from "./actionTypes.js";
import axios from "axios";

//action creators
export const receiveAllSongs = songs => {
  return { type: RECEIVE_ALL_SONGS, songs };
};

export const receiveAllComments = comments => {
  return { type: RECEIVE_ALL_COMMENTS, comments };
};

//funcs
export const getAllSongs = () => dispatch => {
  debugger;
  return axios.get("api/songs").then(songs => {
    debugger;
    return dispatch(receiveAllSongs(songs.data.body));
  });
};

export const getAllComments = () => dispatch => {
  debugger;
  return axios.get("api/comments").then(comments => {
    return dispatch(receiveAllComments(comments.data.body));
  });
};
