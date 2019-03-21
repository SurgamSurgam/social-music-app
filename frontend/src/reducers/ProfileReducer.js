import { RECEIVE_ALL_SONGS_POSTED_BY_USER } from "../actions/actionTypes.js";
import merge from "lodash/merge";

const normalizeData = arr => {
  let obj = {};
  arr.forEach(song => {
    obj[song.id] = song;
  });
  return obj;
};

const ProfileReducer = (oldState = [], action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_ALL_SONGS_POSTED_BY_USER:
      let newState = merge({}, oldState);
      return {
        ...newState,
        allSongsPostedByUser: normalizeData(action.songs)
      };
    default:
      return oldState;
  }
};

export default ProfileReducer;
