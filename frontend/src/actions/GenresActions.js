import { RECEIVE_ALL_GENRES } from "./actionTypes.js";
import axios from "axios";

//action creators
export const receiveAllGenres = genres => {
  return { type: RECEIVE_ALL_GENRES, genres };
};

//funcs
export const getAllGenres = () => dispatch => {
  return axios.get("/api/genres/").then(genres => {
    return dispatch(receiveAllGenres(genres.data.body));
  });
};
