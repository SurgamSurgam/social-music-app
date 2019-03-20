import React from "react";
import SongDisplay from "./songs/SongDisplay.js";

class Genre extends React.Component {
  componentDidMount() {
    debugger;
    this.props.getAllSongs();
    this.props.getAllFavoritesForOneUser();
    this.props.getAllComments();
  }
  render() {
    let songsMapped;
    if (this.props.allSongs) {
      songsMapped = Object.values(this.props.allSongs)
        .reverse()
        .map(song => {
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
      <div className="genreWrapper">
        <h1>GENRE PAGE</h1>
        {songsMapped}
      </div>
    );
  }
}

export default Genre;
