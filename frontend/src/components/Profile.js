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
  render() {
    let { displayToggle } = this.state;

    let usernameUser1;
    let songsMapped;

    if (this.props.allSongsPostedByUser) {
      usernameUser1 = Object.values(this.props.allSongsPostedByUser)[0]
        .username;
      debugger;
      if (
        displayToggle &&
        Object.values(this.props.allSongsPostedByUser).length
      ) {
        debugger;
        songsMapped = Object.values(this.props.allSongsPostedByUser)
          .reverse()
          .map(song => {
            debugger;
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
    } else if (this.props.allSongsallFavoritesForUser) {
      if (
        !displayToggle &&
        Object.values(this.props.allSongsallFavoritesForUser).length
      ) {
        songsMapped = Object.values(this.props.allSongsallFavoritesForUser)
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
        Object.values(this.props.allSongsallFavoritesForUser).length === 0
      ) {
        songsMapped = (
          <div className="errorMessage">
            <h1>This user has not favorited any songs yet.</h1>
          </div>
        );
      }
    }

    return (
      <>
        <h1>PROFILE PAGE</h1>
        <h2>{usernameUser1}</h2>
        {songsMapped}
      </>
    );
  }
}

export default Profile;
