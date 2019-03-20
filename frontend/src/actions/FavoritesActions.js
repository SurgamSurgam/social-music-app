import { RECEIVE_ALL_FAVORITES_FOR_USER } from "./actionTypes.js";
// import { DELETE_FAVORITE } from "./actionTypes.js";
// import { ADD_FAVORITE } from "./actionTypes.js";
import axios from "axios";

export const receiveAllFavoritesForUserId1 = favorites => {
  return { type: RECEIVE_ALL_FAVORITES_FOR_USER, favorites };
};

export const getAllFavoritesForOneUser = () => dispatch => {
  return axios.get("/api/favorites/users/1/").then(favorites => {
    return dispatch(receiveAllFavoritesForUserId1(favorites.data.body));
  });
};
