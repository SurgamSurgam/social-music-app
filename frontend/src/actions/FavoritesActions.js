import { RECEIVE_ALL_FAVORITES_FOR_USER } from "./actionTypes.js";
// import { ADD_FAVORITE } from "./actionTypes.js";
import { DELETE_FAVORITE } from "./actionTypes.js";
import axios from "axios";

export const receiveAllFavoritesForUserId1 = favorites => {
  return { type: RECEIVE_ALL_FAVORITES_FOR_USER, favorites };
};

// export const receiveAddFavorite = songId => {
//   return { type: ADD_FAVORITE, songId };
// };

export const receiveDeleteFavorite = favId => {
  return { type: DELETE_FAVORITE, favId };
};

export const getAllFavoritesForOneUser = () => dispatch => {
  return axios.get("/api/favorites/users/1/").then(favorites => {
    return dispatch(receiveAllFavoritesForUserId1(favorites.data.body));
  });
};

export const addFavorite = songId => dispatch => {
  return axios.post("/api/favorites", { user_id: 1, song_id: +songId });
  // .then(() => {
  //   return dispatch(receiveAddFavorite(+songId));
  // });
};

export const deleteFavorite = favId => dispatch => {
  return axios.delete(`/api/favorites/${+favId}`).then(() => {
    return dispatch(receiveDeleteFavorite(+favId));
  });
};
