import { RECEIVE_ALL_GENRES } from "../actions/actionTypes.js";
import merge from "lodash/merge";

const normalizeData = arr => {
  let obj = {};
  arr.forEach(favorite => {
    obj[favorite.id] = favorite;
  });
  return obj;
};

const GenreReducer = (oldState = [], action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_ALL_GENRES:
      let newState = merge({}, oldState);
      return {
        ...newState,
        allGenres: normalizeData(action.genres)
      };
    default:
      return oldState;
  }
};

export default GenreReducer;
