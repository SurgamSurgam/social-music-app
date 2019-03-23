import React from "react";
import { connect } from "react-redux";
import { addFavorite } from "../../actions/FavoritesActions.js";
import { deleteFavorite } from "../../actions/FavoritesActions.js";
import { getAllFavoritesForOneUser } from "../../actions/FavoritesActions.js";
import { getAllSongs } from "../../actions/SongsActions.js";
import { getAllSongsForOneGenre } from "../../actions/SongsActions.js";
import { withRouter } from "react-router-dom";
import { getAllFavoritesAllDetailsForOneUser } from "../../actions/FavoritesActions.js";

const mapStateToProps = state => {
  return {
    profileViewForPosted: state.profile.profileViewForPosted,
    allSongsByGenre: state.songs.allSongsByGenre,
    allSongs: state.songs.allSongs
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllSongs: () => dispatch(getAllSongs()),
    getAllFavoritesForOneUser: () => dispatch(getAllFavoritesForOneUser()),
    addFavorite: songId => dispatch(addFavorite(songId)),
    deleteFavorite: favId => dispatch(deleteFavorite(favId)),
    getAllSongsForOneGenre: genreId =>
      dispatch(getAllSongsForOneGenre(genreId)),
    getAllFavoritesAllDetailsForOneUser: () =>
      dispatch(getAllFavoritesAllDetailsForOneUser())
  };
};

class FavoriteButtonDisplay extends React.Component {
  render() {
    let answer = [];
    let favId;

    if (
      this.props.match.path === "/profile" &&
      !this.props.profileViewForPosted
    ) {
      if (this.props.allSongs) {
        let answerObj = Object.values(this.props.allSongs).filter(song => {
          if (this.props.song_id === song.id) {
            return song.favorited_count;
          } else {
            return [];
          }
        });
        if (answerObj.length) {
          answer = answerObj[0].favorited_count;
        }
      }

      //to handle sending the correct favId
      let favResults = [];
      if (this.props.allFavoritesForUser) {
        favResults = Object.values(this.props.allFavoritesForUser).filter(
          fav => {
            return this.props.song_id === fav.id;
          }
        );
      }
      if (favResults.length) {
        favId = favResults[0].fav_id;
      }
    } else if (
      this.props.match.path === "/profile" &&
      this.props.profileViewForPosted
    ) {
      if (this.props.allFavoritesForUser) {
        answer = Object.values(this.props.allFavoritesForUser).filter(fav => {
          return this.props.song_id === fav.song_id;
        });
      }

      if (answer.length) {
        favId = answer[0].id;
      }
    } else if (
      this.props.match.path !== "/profile" &&
      this.props.allFavoritesForUser
    ) {
      answer = Object.values(this.props.allFavoritesForUser).filter(fav => {
        return this.props.song_id === fav.song_id;
      });

      if (answer.length) {
        favId = answer[0].id;
      }
    }

    //grabbing genreID to be able sync fav count
    let genreId;
    if (this.props.allSongsByGenre && this.props.allSongsByGenre.length) {
      genreId = this.props.allSongsByGenre[0].genre_id;
    }

    let favCount = 0;
    if (this.props.allSongs) {
      favCount = Object.values(this.props.allSongs).find(song => {
        if (this.props.song_id === song.id) {
          return song.id;
        } else {
          return 0;
        }
      });
    }

    return (
      <div>
        <h2>
          Fav {!!favCount ? favCount.favorited_count : 0}{" "}
          {favCount.favorited_count === 1 ? "time" : "times"}
        </h2>
        {favId ? (
          <button
            onClick={async () => {
              await this.props.deleteFavorite(favId);
              await this.props.getAllSongs();
              await this.props.getAllFavoritesForOneUser();
              await this.props.getAllSongsForOneGenre(genreId);
              await this.props.getAllFavoritesAllDetailsForOneUser();
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
              await this.props.getAllSongsForOneGenre(genreId);
              await this.props.getAllFavoritesAllDetailsForOneUser();
            }}
          >
            Favorite
          </button>
        )}
      </div>
    );
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(FavoriteButtonDisplay)
);
