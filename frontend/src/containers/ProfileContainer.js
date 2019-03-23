import Profile from "../components/Profile.js";
import { connect } from "react-redux";
import { getAllSongs } from "../actions/SongsActions.js";
import { getAllComments } from "../actions/SongsActions.js";
import { getAllFavoritesForOneUser } from "../actions/FavoritesActions.js";
import { getAllSongsPostedByOneUser } from "../actions/ProfileActions.js";
import { getAllFavoritesAllDetailsForOneUser } from "../actions/FavoritesActions.js";
import { receiveProfileViewForPosted } from "../actions/ProfileActions.js";
import { getAllGenres } from "../actions/GenresActions.js";
import { getAllUsers } from "../actions/ProfileActions.js";

const mapStateToProps = state => {
  return {
    allSongsPostedByUser: state.profile.allSongsPostedByUser,
    allSongs: state.songs.allSongs,
    allFavoritesForUser: state.favorites.allFavoritesForUser,
    allUsers: state.profile.allUsers,
    allComments: state.songs.allComments,
    allFavsAllDetailsForUser: state.favorites.allFavsAllDetailsForUser,
    allGenres: state.genres.allGenres
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllSongsPostedByOneUser: () => dispatch(getAllSongsPostedByOneUser()),
    getAllSongs: () => dispatch(getAllSongs()),
    getAllFavoritesForOneUser: () => dispatch(getAllFavoritesForOneUser()),
    getAllUsers: () => dispatch(getAllUsers()),
    getAllComments: () => dispatch(getAllComments()),
    getAllFavoritesAllDetailsForOneUser: () =>
      dispatch(getAllFavoritesAllDetailsForOneUser()),
    receiveProfileViewForPosted: boolValue =>
      dispatch(receiveProfileViewForPosted(boolValue)),
    getAllGenres: () => dispatch(getAllGenres())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
