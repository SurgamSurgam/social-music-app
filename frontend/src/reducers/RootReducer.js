import { combineReducers } from "redux";
import SongsReducer from "./SongsReducer";

const RootReducer = combineReducers({
  songs: SongsReducer
});

export default RootReducer;
