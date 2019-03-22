import { RECEIVE_ALL_FAVORITES_FOR_USER } from "./actionTypes.js";
// import { DYNAMIC_RECEIVE_ALL_FAVORITES_FOR_USER } from "./actionTypes.js";
import { RECEIVE_ALL_FAVORITES_ALL_DETAILS_FOR_USER } from "./actionTypes.js";
import { DELETE_FAVORITE } from "./actionTypes.js";
import axios from "axios";

export const receiveAllFavoritesForUserId1 = favorites => {
  return { type: RECEIVE_ALL_FAVORITES_FOR_USER, favorites };
};

export const receiveAllFavoritesAllDetailsForUserId1 = favorites => {
  return { type: RECEIVE_ALL_FAVORITES_ALL_DETAILS_FOR_USER, favorites };
};

export const receiveDeleteFavorite = favId => {
  return { type: DELETE_FAVORITE, favId };
};

export const getAllFavoritesForOneUser = (user_id = 1) => dispatch => {
  return axios.get(`/api/favorites/users/${user_id}/`).then(favorites => {
    return dispatch(receiveAllFavoritesForUserId1(favorites.data.body));
  });
};

export const getAllFavoritesAllDetailsForOneUser = (
  user_id = 1
) => dispatch => {
  return axios.get(`/api/favorites/users/extra/${user_id}/`).then(favorites => {
    return dispatch(
      receiveAllFavoritesAllDetailsForUserId1(favorites.data.body)
    );
  });
};

export const addFavorite = songId => dispatch => {
  return axios.post("/api/favorites", { user_id: 1, song_id: +songId });
};

export const deleteFavorite = favId => dispatch => {
  return axios.delete(`/api/favorites/${+favId}`).then(() => {
    return dispatch(receiveDeleteFavorite(+favId));
  });
};
