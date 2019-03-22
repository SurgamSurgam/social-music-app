import { RECEIVE_ALL_SONGS_POSTED_BY_USER } from "../actions/actionTypes.js";
import { RECEIVE_PROFILE_VIEW_FOR_POSTED } from "../actions/actionTypes.js";
import merge from "lodash/merge";

const normalizeData = arr => {
  let obj = {};
  arr.forEach(song => {
    obj[song.id] = song;
  });
  return obj;
};

let initState = {
  profileViewForPosted: true
};

const ProfileReducer = (oldState = initState, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_ALL_SONGS_POSTED_BY_USER:
      let newState = merge({}, oldState);
      return {
        ...newState,
        allSongsPostedByUser: normalizeData(action.songs)
      };
    case RECEIVE_PROFILE_VIEW_FOR_POSTED:
      let newState1 = merge({}, oldState);
      return {
        ...newState1,
        profileViewForPosted: action.boolValue
      };
    default:
      return oldState;
  }
};

export default ProfileReducer;
