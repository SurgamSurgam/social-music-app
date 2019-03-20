import React from "react";
import SongDisplay from "./songs/SongDisplay.js";

class Popularity extends React.Component {
  componentDidMount() {
    debugger;
    this.props.getAllSongs();
    this.props.getAllFavoritesForOneUser();
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
          />
        );
      });
    }
    return (
      <div className="popularityWrapper">
        <h1>POPULARITY PAGE</h1>
        {songsMapped}
      </div>
    );
  }
}

export default Popularity;
