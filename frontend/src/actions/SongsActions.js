import { RECEIVE_ALL_SONGS } from "./actionTypes.js";
import axios from "axios";

export const receiveAllSongs = songs => {
  return { type: RECEIVE_ALL_SONGS, songs };
};

export const getAllSongs = () => dispatch => {
  return axios.get("api/songs").then(songs => {
    return dispatch(receiveAllSongs(songs.data.body));
  });
};
