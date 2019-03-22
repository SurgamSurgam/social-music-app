import Popularity from "../components/Popularity.js";
import { connect } from "react-redux";
import { getAllSongs } from "../actions/SongsActions.js";
import { getAllComments } from "../actions/SongsActions.js";
import { getAllFavoritesForOneUser } from "../actions/FavoritesActions.js";
import { getAllUsers } from "../actions/ProfileActions.js";

const mapStateToProps = state => {
  return {
    allSongsByPopularity: state.songs.allSongsByPopularity,
    allFavoritesForUser: state.favorites.allFavoritesForUser,
    allComments: state.songs.allComments,
    allUsers: state.profile.allUsers
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllSongs: () => dispatch(getAllSongs()),
    getAllFavoritesForOneUser: () => dispatch(getAllFavoritesForOneUser()),
    getAllComments: () => dispatch(getAllComments()),
    getAllUsers: () => dispatch(getAllUsers())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Popularity);
