import React from "react";
import SongDisplay from "./SongDisplay.js";

class Songs extends React.Component {
  state = {
    searchQuery: "",
    searchQueryCopyForFiltering: "",
    searchResults: [],
    isSubmitted: false
  };

  componentDidMount() {
    this.props.getAllUsers();
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
            // debugger;
            // let changingUser = [];
            // if (this.props.allUsers) {
            //   console.log("SUP");
            //   if (this.props.allUsers.length) {
            //     console.log("BRO");
            //   }
            // }
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
          // let changingUser = [];
          // if (this.props.allUsers) {
          //   if (this.props.allUsers.length) {
          //     debugger;
          //   }
          // }
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
      <div className="songsWrapper topMost">
        <div className="songsPageFormContainer form">
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
        </div>
        <div className="feed songsFeed">{songsMapped}</div>
      </div>
    );
  }
}

export default Songs;
