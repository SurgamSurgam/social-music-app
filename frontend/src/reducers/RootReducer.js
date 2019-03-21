import { combineReducers } from "redux";
import SongsReducer from "./SongsReducer";
import FavoritesReducer from "./FavoritesReducer";
import GenreReducer from "./GenreReducer";
import ProfileReducer from "./ProfileReducer";

const RootReducer = combineReducers({
  songs: SongsReducer,
  favorites: FavoritesReducer,
  genres: GenreReducer,
  profile: ProfileReducer
});

export default RootReducer;
