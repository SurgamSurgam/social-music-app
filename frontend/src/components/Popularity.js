import React from "react";
import SongDisplay from "./songs/SongDisplay.js";

class Popularity extends React.Component {
  componentDidMount() {
    this.props.getAllSongs();
    this.props.getAllFavoritesForOneUser();
    this.props.getAllUsers();
    this.props.getAllComments();
  }
  render() {
    let songsMapped;
    if (this.props.allSongsByPopularity) {
      songsMapped = Object.values(this.props.allSongsByPopularity).map(song => {
        return (
          <SongDisplay
            title={song.title}
            img_url={song.img_url}
            favorited_count={song.favorited_count}
            user_id={song.user_id}
            song_id={song.id}
            allFavoritesForUser={this.props.allFavoritesForUser}
            allComments={this.props.allComments}
            getAllComments={this.props.getAllComments}
            key={song.id}
            allUsers={this.props.allUsers}
          />
        );
      });
    }
    return (
      <div className="popularityWrapper topMost">
        <div className="feed genreFeed">{songsMapped}</div>
      </div>
    );
  }
}

export default Popularity;
