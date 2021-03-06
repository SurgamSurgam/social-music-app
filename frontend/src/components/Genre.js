import React from "react";
import SongDisplay from "./songs/SongDisplay.js";

class Genre extends React.Component {
  state = {
    selectedGenre: "",
    formSubmitted: false
  };

  componentDidMount() {
    this.props.getAllUsers();
    this.props.getAllGenres();
    this.props.getAllSongs();
    this.props.getAllFavoritesForOneUser();
    this.props.getAllComments();
  }

  handleSelect = e => {
    if (+e.target.value === 0) {
      this.setState({
        [e.target.name]: e.target.value,
        formSubmitted: false
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value
      });
    }
  };

  handleFormSubmit = async e => {
    e.preventDefault();
    await this.props.getAllSongsForOneGenre(+this.state.selectedGenre);
    await this.setState({
      formSubmitted: true
    });
  };

  render() {
    const { formSubmitted } = this.state;

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

    if (formSubmitted && this.props.allSongsByGenre.length) {
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
              allUsers={this.props.allUsers}
            />
          );
        });
    } else if (formSubmitted && this.props.allSongsByGenre.length === 0) {
      songsMapped = (
        <div className="errorMessage">
          <h1>No Results Found. Please select another genre.</h1>
        </div>
      );
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
              allUsers={this.props.allUsers}
            />
          );
        });
    }

    return (
      <div className="genreWrapper topMost">
        <div className="genrePageFormContainer form">
          <form onSubmit={this.handleFormSubmit}>
            <select name="selectedGenre" onChange={this.handleSelect}>
              <option key="0" value="0">
                {" "}
              </option>
              {genreList}
            </select>
            <button type="submit">Search By Genre</button>
          </form>
        </div>
        <div className="feed genreFeed">{songsMapped}</div>
      </div>
    );
  }
}

export default Genre;
