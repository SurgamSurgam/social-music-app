import { RECEIVE_ALL_SONGS } from "../actions/actionTypes.js";
import { RECEIVE_ALL_COMMENTS } from "../actions/actionTypes.js";
import { RECEIVE_ALL_SONGS_FOR_GENRE } from "../actions/actionTypes.js";
import merge from "lodash/merge";

const normalizeData = arr => {
  let obj = {};
  arr.forEach(song => {
    obj[song.id] = song;
  });
  return obj;
};

const SongsReducer = (oldState = [], action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_ALL_SONGS:
      let newState = merge({}, oldState);

      return {
        ...newState,
        allSongs: normalizeData(action.songs),
        allSongsByPopularity: action.songs
      };
    case RECEIVE_ALL_COMMENTS:
      let newState1 = merge({}, oldState);
      return {
        ...newState1,
        allComments: normalizeData(action.comments)
      };
    case RECEIVE_ALL_SONGS_FOR_GENRE:
      let newState2 = merge({}, oldState);

      return {
        ...newState2,
        allSongsByGenre: action.songsbyGenre
      };
    default:
      return oldState;
  }
};

export default SongsReducer;
