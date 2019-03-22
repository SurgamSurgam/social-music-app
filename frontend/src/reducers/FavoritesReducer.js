import { RECEIVE_ALL_FAVORITES_FOR_USER } from "../actions/actionTypes.js";
import { RECEIVE_ALL_FAVORITES_ALL_DETAILS_FOR_USER } from "../actions/actionTypes.js";
import { DELETE_FAVORITE } from "../actions/actionTypes.js";
import merge from "lodash/merge";

const normalizeData = arr => {
  let obj = {};
  arr.forEach(favorite => {
    obj[favorite.id] = favorite;
  });
  return obj;
};

const FavoritesReducer = (oldState = [], action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_ALL_FAVORITES_FOR_USER:
      let newState = merge({}, oldState);
      return {
        ...newState,
        allFavoritesForUser: normalizeData(action.favorites)
      };
    case RECEIVE_ALL_FAVORITES_ALL_DETAILS_FOR_USER:
      let newState2 = merge({}, oldState);
      return {
        ...newState2,
        allFavsAllDetailsForUser: normalizeData(action.favorites)
      };
    case DELETE_FAVORITE:
      let newState1 = merge({}, oldState);
      delete newState1.allFavoritesForUser[action.favId];
      return newState1;
    default:
      return oldState;
  }
};

export default FavoritesReducer;
