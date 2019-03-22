import React from "react";
import SongDisplay from "./songs/SongDisplay.js";
import "./Profile.css";

class Profile extends React.Component {
  state = {
    isDisplayPostedView: true
  };

  componentDidMount() {
    this.props.getAllSongsPostedByOneUser();
    this.props.getAllFavoritesForOneUser();
    this.props.getAllComments();
    this.props.getAllFavoritesAllDetailsForOneUser();
    this.props.getAllSongs();
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

  render() {
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
        {songsMapped}
      </div>
    );
  }
}

export default Profile;
