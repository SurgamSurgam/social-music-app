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
    allUsers: state.profile.allUsers,
    allComments: state.songs.allComments
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllSongs: () => dispatch(getAllSongs()),
    getAllFavoritesForOneUser: () => dispatch(getAllFavoritesForOneUser()),
    getAllUsers: () => dispatch(getAllUsers()),
    getAllComments: () => dispatch(getAllComments())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Popularity);
