import React from "react";
import SongDisplay from "./songs/SongDisplay.js";

class Profile extends React.Component {
  state = {
    displayToggle: true
  };

  componentDidMount() {
    this.props.getAllSongsPostedByOneUser();
    this.props.getAllFavoritesForOneUser();
    this.props.getAllComments();
  }

  handleToggle = async val => {
    if (val === "posted") {
      await this.setState({
        displayToggle: true
      });
    }
    if (val === "favorited") {
      await this.setState({
        displayToggle: false
      });
    }
  };

  render() {
    console.log(this.state);
    let { displayToggle } = this.state;

    let usernameUser1;
    let songsMapped;
    debugger;
    if (displayToggle && this.props.allSongsPostedByUser) {
      debugger;
      usernameUser1 = Object.values(this.props.allSongsPostedByUser)[0]
        .username;

      if (
        displayToggle &&
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
        displayToggle &&
        Object.values(this.props.allSongsPostedByUser).length === 0
      ) {
        songsMapped = (
          <div className="errorMessage">
            <h1>This user has not posted any songs yet.</h1>
          </div>
        );
      }
    } else if (!displayToggle && this.props.allFavoritesForUser) {
      debugger;
      if (
        !displayToggle &&
        Object.values(this.props.allFavoritesForUser).length
      ) {
        songsMapped = Object.values(this.props.allFavoritesForUser)
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
        !displayToggle &&
        Object.values(this.props.allFavoritesForUser).length === 0
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
            className="postedButtonProfile"
            onClick={() => this.handleToggle("posted")}
          >
            Posted
          </button>
          <button
            className="favoritedButtonProfile"
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
