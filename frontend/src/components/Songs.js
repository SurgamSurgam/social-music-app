import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Songs extends React.Component {
  state = {
    searchQuery: "",
    searchResults: [],
    notFound: false
  };

  componentDidMount() {
    this.props.getAllSongs();
    this.props.getAllFavoritesForOneUser();
  }

  handleChange = e => {
    this.setState({
      searchQuery: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { searchQuery } = this.state;

    let filteredSongs = Object.values(this.props.allSongs).filter(song => {
      return song.title.toLowerCase().includes(searchQuery.toLowerCase());
    });

    if (filteredSongs.length) {
      let mappedSearchedResults = this.mapSearchResults(filteredSongs);

      this.setState({
        searchResults: mappedSearchedResults,
        searchQuery: "",
        notFound: false
      });
    } else {
      this.setState({
        notFound: true,
        searchQuery: ""
      });
    }
  };

  mapSearchResults = results => {
    let searchResultsMapped = Object.values(results)
      .reverse()
      .map(song => {
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
          </div>
        );
      });
    return searchResultsMapped;
  };

  deleteFavorite = async favId => {
    await axios.delete(`/api/favorites/${+favId}`);
    this.props.getAllSongs();
    this.props.getAllFavoritesForOneUser();
  };

  addFavorite = async songId => {
    //user default to 1

    await axios.post("/api/favorites", { user_id: 1, song_id: +songId });
    this.props.getAllSongs();
    this.props.getAllFavoritesForOneUser();
  };

  render() {
    // console.log(this.state);

    let songsMapped;
    if (this.props.allSongs) {
      songsMapped = Object.values(this.props.allSongs)
        .reverse()
        .map(song => {
          // let that = this;
          // let user1favs;
          // if (that.props.allFavoritesForUser) {
          //   user1favs = Object.values(that.props.allFavoritesForUser).map(
          //     fav => {
          //       debugger;
          //       return fav.song_id === song.id;
          //     }
          //   );
          // }
          // ************************************************************

          // let answer = [];
          // if (this.props.allFavoritesForUser) {
          //   answer = Object.values(this.props.allFavoritesForUser).map(fav => {
          //     if (song.id === fav.song_id) {
          //       return fav.id;
          //     } else {
          //       return false;
          //     }
          //   });
          // }
          let answer = [];
          if (this.props.allFavoritesForUser) {
            answer = Object.values(this.props.allFavoritesForUser).filter(
              fav => {
                return song.id === fav.song_id;
              }
            );
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
                User's username HERE!{" "}
                <Link to={"/profile"}>{song.user_id}</Link>
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

              {/*{answer.includes(true) ? (
                <button onClick={this.handleFavorite}>Unfavorite</button>
              ) : (
                <button onClick={this.handleFavorite}>Favorite</button>
              )}*/}

              {/*{user1favs ? (
                <button onClick={this.handleFavorite}>Unfavorite</button>
              ) : (
                <button onClick={this.handleFavorite}>Favorite</button>
              )}*/}
            </div>
          );
        });
    }

    return (
      <div className="songsWrapper">
        <h1>SONGS PAGE</h1>
        {this.state.notFound
          ? "No Results Found.  Please search for another song."
          : null}
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input
            type="text"
            value={this.state.searchQuery}
            onChange={this.handleChange}
          />
          <button type="submit">Search By Title</button>
        </form>
        {this.state.searchResults.length
          ? this.state.searchResults
          : songsMapped}
      </div>
    );
  }
}

export default Songs;
