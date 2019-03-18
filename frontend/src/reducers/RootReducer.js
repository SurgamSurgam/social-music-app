import { combineReducers } from "redux";
import SongsReducer from "./SongsReducer";
import FavoritesReducer from "./FavoritesReducer";

const RootReducer = combineReducers({
  songs: SongsReducer,
  favorites: FavoritesReducer
});

export default RootReducer;
