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
    allComments: state.songs.allComments,
    allFavsAllDetailsForUser: state.favorites.allFavsAllDetailsForUser,
    allGenres: state.genres.allGenres,
    allUsers: state.profile.allUsers
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dynamic_getAllSongsPostedByOneUser: user_id =>
      dispatch(dynamic_getAllSongsPostedByOneUser(user_id)),
    getAllSongsPostedByOneUser: () => dispatch(getAllSongsPostedByOneUser()),
    getAllSongs: () => dispatch(getAllSongs()),
    getAllFavoritesForOneUser: () => dispatch(getAllFavoritesForOneUser()),
    getAllComments: () => dispatch(getAllComments()),
    getAllFavoritesAllDetailsForOneUser: () =>
      dispatch(getAllFavoritesAllDetailsForOneUser()),
    receiveProfileViewForPosted: boolValue =>
      dispatch(receiveProfileViewForPosted(boolValue)),
    getAllGenres: () => dispatch(getAllGenres()),
    getAllUsers: () => dispatch(getAllUsers())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OtherProfiles);
