import Songs from "../components/Songs.js";
import { connect } from "react-redux";
import { getAllSongs } from "../actions/SongsActions.js";

const mapStateToProps = state => {
  return {
    allSongs: state.songs.allSongs
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllSongs: () => dispatch(getAllSongs())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Songs);
