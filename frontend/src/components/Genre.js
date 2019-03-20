import React from "react";
import SongDisplay from "./songs/SongDisplay.js";

class Genre extends React.Component {
  state = {
    selectedGenre: "",
    formSubmitted: false
  };

  componentDidMount() {
    this.props.getAllGenres();
    this.props.getAllSongs();
    this.props.getAllFavoritesForOneUser();
    this.props.getAllComments();
  }

  handleSelect = e => {
    this.setState({
      [e.target.name]: e.target.value,
      formSubmitted: false
    });
  };

  handleFormSubmit = async e => {
    e.preventDefault();

    await this.props.getAllSongsForOneGenre(+this.state.selectedGenre);

    await this.setState({
      formSubmitted: true
    });
  };

  render() {
    console.log(this.state);
    const { selectedGenre, formSubmitted } = this.state;

    let genreList = [];
    if (this.props.allGenres) {
      genreList = Object.values(this.props.allGenres).map((genre, i) => {
        return (
          <option key={i + 1} value={genre.id}>
            {genre.genre_name}
          </option>
        );
      });
    }

    let songsMapped;

    if (formSubmitted && this.props.allSongsByGenre) {
      debugger;
      songsMapped = Object.values(this.props.allSongsByGenre)
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
    } else if (this.props.allSongs) {
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
        <form onSubmit={this.handleFormSubmit}>
          <select name="selectedGenre" onChange={this.handleSelect}>
            <option key="0" value="">
              {" "}
            </option>
            {genreList}
          </select>
          <button type="submit">Search By Genre</button>
        </form>
        {songsMapped}
      </div>
    );
  }
}

export default Genre;
