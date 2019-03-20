import { RECEIVE_ALL_SONGS } from "./actionTypes.js";
import { RECEIVE_ALL_COMMENTS } from "./actionTypes.js";
import { RECEIVE_ALL_SONGS_FOR_GENRE } from "./actionTypes.js";
import axios from "axios";

//action creators
export const receiveAllSongs = songs => {
  return { type: RECEIVE_ALL_SONGS, songs };
};

export const receiveAllComments = comments => {
  return { type: RECEIVE_ALL_COMMENTS, comments };
};

export const receiveAllSongsForOneGenre = songsbyGenre => {
  return { type: RECEIVE_ALL_SONGS_FOR_GENRE, songsbyGenre };
};

//funcs
export const getAllSongs = () => dispatch => {
  return axios.get("/api/songs/").then(songs => {
    return dispatch(receiveAllSongs(songs.data.body));
  });
};

export const getAllComments = () => dispatch => {
  return axios.get("/api/comments/").then(comments => {
    return dispatch(receiveAllComments(comments.data.body));
  });
};

export const getAllSongsForOneGenre = genreId => dispatch => {
  return axios.get(`/api/songs/genres/${genreId}`).then(songs => {
    return dispatch(receiveAllSongsForOneGenre(songs.data.body));
  });
};
