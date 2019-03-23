import Songs from "../components/songs/Songs.js";
import { connect } from "react-redux";
import { getAllSongs } from "../actions/SongsActions.js";
import { getAllComments } from "../actions/SongsActions.js";
import { getAllFavoritesForOneUser } from "../actions/FavoritesActions.js";
import { addFavorite } from "../actions/FavoritesActions.js";
import { deleteFavorite } from "../actions/FavoritesActions.js";
import { getAllUsers } from "../actions/ProfileActions.js";

const mapStateToProps = state => {
  return {
    allUsers: state.profile.allUsers,
    allSongs: state.songs.allSongs,
    allFavoritesForUser: state.favorites.allFavoritesForUser,
    allComments: state.songs.allComments
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllSongs: () => dispatch(getAllSongs()),
    getAllFavoritesForOneUser: () => dispatch(getAllFavoritesForOneUser()),
    getAllUsers: () => dispatch(getAllUsers()),
    getAllComments: () => dispatch(getAllComments()),
    addFavorite: songId => dispatch(addFavorite(songId)),
    deleteFavorite: favId => dispatch(deleteFavorite(favId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Songs);
