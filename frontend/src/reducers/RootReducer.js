import { combineReducers } from "redux";
import SongsReducer from "./SongsReducer";
import FavoritesReducer from "./FavoritesReducer";
import GenreReducer from "./GenreReducer";

const RootReducer = combineReducers({
  songs: SongsReducer,
  favorites: FavoritesReducer,
  genres: GenreReducer
});

export default RootReducer;
