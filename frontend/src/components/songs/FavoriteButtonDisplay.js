import React from "react";
import { connect } from "react-redux";
import { addFavorite } from "../../actions/FavoritesActions.js";
import { deleteFavorite } from "../../actions/FavoritesActions.js";
import { getAllFavoritesForOneUser } from "../../actions/FavoritesActions.js";
import { getAllSongs } from "../../actions/SongsActions.js";

const mapDispatchToProps = dispatch => {
  return {
    getAllSongs: () => dispatch(getAllSongs()),
    getAllFavoritesForOneUser: () => dispatch(getAllFavoritesForOneUser()),
    addFavorite: songId => dispatch(addFavorite(songId)),
    deleteFavorite: favId => dispatch(deleteFavorite(favId))
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
  null,
  mapDispatchToProps
)(FavoriteButtonDisplay);
