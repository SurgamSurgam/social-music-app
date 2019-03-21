import React from "react";
import { connect } from "react-redux";
import { addFavorite } from "../../actions/FavoritesActions.js";
import { deleteFavorite } from "../../actions/FavoritesActions.js";
import { getAllFavoritesForOneUser } from "../../actions/FavoritesActions.js";
import { getAllSongs } from "../../actions/SongsActions.js";
import { getAllSongsForOneGenre } from "../../actions/SongsActions.js";

const mapStateToProps = state => {
  return {
    allSongsByGenre: state.songs.allSongsByGenre
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllSongs: () => dispatch(getAllSongs()),
    getAllFavoritesForOneUser: () => dispatch(getAllFavoritesForOneUser()),
    addFavorite: songId => dispatch(addFavorite(songId)),
    deleteFavorite: favId => dispatch(deleteFavorite(favId)),
    getAllSongsForOneGenre: genreId => dispatch(getAllSongsForOneGenre(genreId))
  };
};

class FavoriteButtonDisplay extends React.Component {
  render() {
    let answer = [];
    if (this.props.allFavoritesForUser) {
      answer = Object.values(this.props.allFavoritesForUser).filter(fav => {
        return this.props.song_id === fav.song_id;
      });
    }
    let favId;
    if (answer.length) {
      favId = answer[0].id;
    }
    //grabbing genreID to be able sync fav count
    let genreId;
    if (this.props.allSongsByGenre && this.props.allSongsByGenre.length) {
      genreId = this.props.allSongsByGenre[0].genre_id;
    }
    return (
      <div>
        <h2>
          Favorited {this.props.favorited_count}{" "}
          {this.props.favorited_count === 1 ? "time" : "times"}
        </h2>
        {favId ? (
          <button
            onClick={async () => {
              await this.props.deleteFavorite(favId);
              await this.props.getAllSongs();
              await this.props.getAllFavoritesForOneUser();
              await this.props.getAllSongsForOneGenre(genreId);
              if (genreId) {
                await this.props.getAllSongsForOneGenre(genreId);
              }
            }}
          >
            Unfavorite
          </button>
        ) : (
          <button
            onClick={async () => {
              await this.props.addFavorite(this.props.song_id);
              await this.props.getAllSongs();
              await this.props.getAllFavoritesForOneUser();
              if (genreId) {
                await this.props.getAllSongsForOneGenre(genreId);
              }
            }}
          >
            Favorite
          </button>
        )}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FavoriteButtonDisplay);
