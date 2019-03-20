import React from "react";
import axios from "axios";
import SongDisplay from "./SongDisplay.js";

class Songs extends React.Component {
  state = {
    searchQuery: "",
    searchQueryCopyForFiltering: "",
    searchResults: [],
    favToggle: false,
    isSubmitted: false
  };

  componentDidMount() {
    this.props.getAllSongs();
    this.props.getAllFavoritesForOneUser();
    this.props.getAllComments();
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      searchQueryCopyForFiltering: e.target.value,
      isSubmitted: false
    });
  };

  handleSubmit = e => {
    if (e) {
      e.preventDefault();
    }

    //resets back to all songs is search is empty and no searchResults found
    if (!this.state.searchQuery && !this.state.searchResults.length) {
      this.setState({
        isSubmitted: false
      });
    } else {
      this.setState({
        isSubmitted: true,
        searchQuery: ""
      });
    }
  };

  // deleteFavorite = async favId => {
  //   await axios.delete(`/api/favorites/${+favId}`);
  //   this.props.getAllSongs();
  //   this.props.getAllFavoritesForOneUser();
  // };
  //
  // addFavorite = async songId => {
  //   //user default is user 1
  //   await axios.post("/api/favorites", { user_id: 1, song_id: +songId });
  //   this.props.getAllSongs();
  //   this.props.getAllFavoritesForOneUser();
  // };

  render() {
    let songsMapped;

    if (this.props.allSongs && this.state.isSubmitted) {
      let filteredSongs = Object.values(this.props.allSongs).filter(song => {
        return song.title
          .toLowerCase()
          .includes(this.state.searchQueryCopyForFiltering.toLowerCase());
      });

      if (filteredSongs.length && this.state.searchQueryCopyForFiltering) {
        songsMapped = Object.values(filteredSongs)
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
      } else {
        songsMapped = (
          <div className="errorMessage">
            <h1>No Results Found. Please search for another song.</h1>
          </div>
        );
      }
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
      <div className="songsWrapper">
        <h1>SONGS PAGE</h1>
        <form
          className="searchByTitleForm"
          onSubmit={this.handleSubmit.bind(this)}
        >
          <input
            name="searchQuery"
            type="text"
            value={this.state.searchQuery}
            onChange={this.handleChange}
          />
          <button type="submit">Search By Title</button>
        </form>
        {songsMapped}
      </div>
    );
  }
}

export default Songs;
