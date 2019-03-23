import Genre from "../components/Genre.js";
import { connect } from "react-redux";
import { getAllSongs } from "../actions/SongsActions.js";
import { getAllComments } from "../actions/SongsActions.js";
import { getAllFavoritesForOneUser } from "../actions/FavoritesActions.js";
import { getAllGenres } from "../actions/GenresActions.js";
import { getAllSongsForOneGenre } from "../actions/SongsActions.js";
import { getAllUsers } from "../actions/ProfileActions.js";

const mapStateToProps = state => {
  return {
    allSongsByGenre: state.songs.allSongsByGenre,
    allGenres: state.genres.allGenres,
    allSongs: state.songs.allSongs,
    allFavoritesForUser: state.favorites.allFavoritesForUser,
    allUsers: state.profile.allUsers,
    allComments: state.songs.allComments
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllGenres: () => dispatch(getAllGenres()),
    getAllSongs: () => dispatch(getAllSongs()),
    getAllFavoritesForOneUser: () => dispatch(getAllFavoritesForOneUser()),
    getAllUsers: () => dispatch(getAllUsers()),
    getAllComments: () => dispatch(getAllComments()),
    getAllSongsForOneGenre: genreId => dispatch(getAllSongsForOneGenre(genreId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Genre);
