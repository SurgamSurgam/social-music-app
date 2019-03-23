import OtherProfiles from "../components/OtherProfiles.js";
import { connect } from "react-redux";
import { getAllSongs } from "../actions/SongsActions.js";
import { getAllComments } from "../actions/SongsActions.js";
import { getAllFavoritesForOneUser } from "../actions/FavoritesActions.js";
import { getAllSongsPostedByOneUser } from "../actions/ProfileActions.js";
import { getAllFavoritesAllDetailsForOneUser } from "../actions/FavoritesActions.js";
import { receiveProfileViewForPosted } from "../actions/ProfileActions.js";
import { getAllGenres } from "../actions/GenresActions.js";
import { getAllUsers } from "../actions/ProfileActions.js";
//dynamic
import { dynamic_getAllSongsPostedByOneUser } from "../actions/ProfileActions.js";

const mapStateToProps = state => {
  return {
    dynamic_allSongsPostedByUser: state.profile.dynamic_allSongsPostedByUser,
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
    dynamic_getAllSongsPostedByOneUser: user_id =>
      dispatch(dynamic_getAllSongsPostedByOneUser(user_id)),
    getAllFavoritesForOneUser: user_id =>
      dispatch(getAllFavoritesForOneUser(user_id)),
    getAllFavoritesAllDetailsForOneUser: user_id =>
      dispatch(getAllFavoritesAllDetailsForOneUser(user_id)),
    getAllSongsPostedByOneUser: () => dispatch(getAllSongsPostedByOneUser()),
    getAllSongs: () => dispatch(getAllSongs()),
    getAllUsers: () => dispatch(getAllUsers()),
    getAllComments: () => dispatch(getAllComments()),
    receiveProfileViewForPosted: boolValue =>
      dispatch(receiveProfileViewForPosted(boolValue)),
    getAllGenres: () => dispatch(getAllGenres())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OtherProfiles);
