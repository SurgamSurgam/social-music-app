import Songs from "../components/songs/Songs.js";
import { connect } from "react-redux";
import { getAllSongs } from "../actions/SongsActions.js";
import { getAllComments } from "../actions/SongsActions.js";
import { getAllFavoritesForOneUser } from "../actions/FavoritesActions.js";

const mapStateToProps = state => {
  return {
    allSongs: state.songs.allSongs,
    allFavoritesForUser: state.favorites.allFavoritesForUser,
    allComments: state.songs.allComments
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllSongs: () => dispatch(getAllSongs()),
    getAllFavoritesForOneUser: () => dispatch(getAllFavoritesForOneUser()),
    getAllComments: () => dispatch(getAllComments())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Songs);
