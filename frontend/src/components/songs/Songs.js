import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SongDisplay from "./SongDisplay.js";

class Songs extends React.Component {
  state = {
    searchQuery: "",
    searchResults: [],
    notFound: false,
    favToggle: false
  };

  componentDidMount() {
    this.props.getAllSongs();
    this.props.getAllFavoritesForOneUser();
    this.props.getAllComments();
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    if (e) {
      e.preventDefault();
    }

    const { searchQuery } = this.state;

    let filteredSongs = Object.values(this.props.allSongs).filter(song => {
      return song.title.toLowerCase().includes(searchQuery.toLowerCase());
    });

    if (filteredSongs.length && this.state.searchQuery) {
      let mappedSearchedResults = this.mapSearchResults(filteredSongs);

      this.setState({
        searchResults: mappedSearchedResults,
        searchQuery: "",
        notFound: false
      });
    } else if (this.state.favToggle) {
      this.setState({
        notFound: false,
        searchQuery: "",
        searchResults: [],
        favToggle: false
      });
    } else {
      this.setState({
        notFound: true,
        searchQuery: "",
        searchResults: []
      });
    }
  };

  mapSearchResults = results => {
    let searchResultsMapped = Object.values(results)
      .reverse()
      .map(song => {
        let answer = [];
        if (this.props.allFavoritesForUser) {
          answer = Object.values(this.props.allFavoritesForUser).filter(fav => {
            return song.id === fav.song_id;
          });
        }
        let favId;
        if (answer.length) {
          favId = answer[0].id;
        }
        return (
          <div className="songsMappedDiv" key={song.id}>
            <h1>Title: {song.title}</h1>
            <img src={song.img_url} alt="" />
            <h2>
              Favorited {song.favorited_count}{" "}
              {song.favorited_count === 1 ? "time" : "times"}
            </h2>
            {/*Map all users to this component and use user_id to get the username*/}
            <h2>
              User's username HERE! <Link to={"/profile"}>{song.user_id}</Link>
            </h2>
            {favId ? (
              <button onClick={() => this.deleteFavorite(favId)}>
                Unfavorite
              </button>
            ) : (
              <button onClick={() => this.addFavorite(song.id)}>
                Favorite
              </button>
            )}
          </div>
        );
      });
    return searchResultsMapped;
  };

  deleteFavorite = async favId => {
    await axios.delete(`/api/favorites/${+favId}`);
    this.props.getAllSongs();
    this.props.getAllFavoritesForOneUser();
    await this.setState({
      favToggle: !this.state.favToggle
    });
    this.handleSubmit();
  };

  addFavorite = async songId => {
    //user default is user 1

    await axios.post("/api/favorites", { user_id: 1, song_id: +songId });
    this.props.getAllSongs();
    this.props.getAllFavoritesForOneUser();
    await this.setState({
      favToggle: !this.state.favToggle
    });
    this.handleSubmit();
  };

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
              deleteFavorite={this.deleteFavorite}
              addFavorite={this.addFavorite}
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
        <div className="searchByTitleForm">
          {this.state.notFound
            ? "No Results Found.  Please search for another song."
            : null}
          <form onSubmit={this.handleSubmit.bind(this)}>
            <input
              name="searchQuery"
              type="text"
              value={this.state.searchQuery}
              onChange={this.handleChange}
            />
            <button type="submit">Search By Title</button>
          </form>
        </div>
        {this.state.searchResults.length
          ? this.state.searchResults
          : songsMapped}
      </div>
    );
  }
}

export default Songs;