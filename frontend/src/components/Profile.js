import React from "react";
import SongDisplay from "./songs/SongDisplay.js";
import "./Profile.css";
import axios from "axios";

class Profile extends React.Component {
  state = {
    isDisplayPostedView: true,
    newSongTitle: "",
    newSongImgUrl: "",
    selectedGenre: ""
  };

  componentDidMount() {
    this.props.getAllSongsPostedByOneUser();
    this.props.getAllFavoritesForOneUser();
    this.props.getAllComments();
    this.props.getAllFavoritesAllDetailsForOneUser();
    this.props.getAllSongs();
    this.props.getAllGenres();
  }

  handleToggle = async val => {
    if (val === "posted") {
      await this.setState({
        isDisplayPostedView: true
      });
      this.props.receiveProfileViewForPosted(true);
    }
    if (val === "favorited") {
      await this.setState({
        isDisplayPostedView: false
      });
      this.props.receiveProfileViewForPosted(false);
    }
  };

  handleNewSongChange = e => {
    this.setState({
      [e.target.name]: e.target.value
      // searchQueryCopyForFiltering: e.target.value,
      // isSubmitted: false
    });
  };

  // handleSelect = e => {
  //   this.setState({
  //     [e.target.name]: e.target.value
  //   });
  // };

  handleNewSongSubmit = e => {
    if (e) {
      e.preventDefault();
    }

    let { newSongTitle, newSongImgUrl, selectedGenre } = this.state;

    axios
      .post("/api/songs/", {
        title: newSongTitle,
        img_url: newSongImgUrl,
        user_id: 1,
        genre_id: selectedGenre
      })
      .then(() => {
        this.setState({
          newSongTitle: "",
          newSongImgUrl: "",
          selectedGenre: ""
        });
      })
      .then(() => {
        this.props.getAllSongs();
        this.props.getAllSongsPostedByOneUser();
      });
  };

  render() {
    console.log(this.state);
    let { isDisplayPostedView } = this.state;
    //To display sample user 1
    let usernameUser1;
    if (this.props.allSongsPostedByUser) {
      usernameUser1 = Object.values(this.props.allSongsPostedByUser)[0]
        .username;
    }
    //To display body of prof
    let songsMapped;
    if (isDisplayPostedView && this.props.allSongsPostedByUser) {
      if (
        isDisplayPostedView &&
        Object.values(this.props.allSongsPostedByUser).length
      ) {
        songsMapped = Object.values(this.props.allSongsPostedByUser)
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
      } else if (
        isDisplayPostedView &&
        Object.values(this.props.allSongsPostedByUser).length === 0
      ) {
        songsMapped = (
          <div className="errorMessage">
            <h1>This user has not posted any songs yet.</h1>
          </div>
        );
      }
    } else if (!isDisplayPostedView && this.props.allFavsAllDetailsForUser) {
      if (
        !isDisplayPostedView &&
        Object.values(this.props.allFavsAllDetailsForUser).length
      ) {
        songsMapped = Object.values(this.props.allFavsAllDetailsForUser)
          .reverse()
          .map(song => {
            return (
              <SongDisplay
                title={song.title}
                img_url={song.img_url}
                favorited_count={song.favorited_count}
                user_id={song.user_id}
                song_id={song.id}
                allFavoritesForUser={this.props.allFavsAllDetailsForUser}
                allComments={this.props.allComments}
                getAllComments={this.props.getAllComments}
                key={song.id}
              />
            );
          });
      } else if (
        !isDisplayPostedView &&
        Object.values(this.props.allFavsAllDetailsForUser).length === 0
      ) {
        songsMapped = (
          <div className="errorMessage">
            <h1>This user has not favorited any songs yet.</h1>
          </div>
        );
      }
    }

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

    let displayNewSongForm = (
      <div className="newSongFormContainer">
        <h2 className="newSongH2">Add New Song</h2>
        <form
          className="newSongForm"
          onSubmit={this.handleNewSongSubmit.bind(this)}
        >
          <input
            name="newSongTitle"
            type="text"
            value={this.state.newSongTitle}
            onChange={this.handleNewSongChange}
            placeholder="Title"
            required
          />
          <input
            name="newSongImgUrl"
            type="text"
            value={this.state.newSongImgUrl}
            onChange={this.handleNewSongChange}
            placeholder="Image URL"
            required
          />
          <select
            required
            name="selectedGenre"
            onChange={this.handleNewSongChange}
          >
            <option key="0" />
            {genreList}
          </select>
          <button type="submit">Submit</button>
        </form>
      </div>
    );

    return (
      <div className="profileWrapper">
        <h1>PROFILE PAGE</h1>
        <h2>{usernameUser1}</h2>
        <div className="profileButtonsContainer">
          <button
            className={
              isDisplayPostedView
                ? "postedButtonProfile isSelectedBackgroundRed"
                : "postedButtonProfile"
            }
            onClick={() => this.handleToggle("posted")}
          >
            Posted
          </button>
          <button
            className={
              !isDisplayPostedView
                ? "favoritedButtonProfile isSelectedBackgroundRed"
                : "favoritedButtonProfile"
            }
            onClick={() => this.handleToggle("favorited")}
          >
            Favorited
          </button>
        </div>
        {isDisplayPostedView ? displayNewSongForm : null}
        {songsMapped}
      </div>
    );
  }
}

export default Profile;
