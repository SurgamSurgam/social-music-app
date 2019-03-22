import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import CommentsDisplay from "./CommentsDisplay.js";
import FavoriteButtonDisplay from "./FavoriteButtonDisplay.js";

class SongDisplay extends React.Component {
  render() {
    let changingUserUsername = [];
    let changingUserId = [];
    if (this.props.allUsers) {
      if (this.props.allUsers.length) {
        let temp = Object.values(this.props.allUsers).find(user => {
          return user.id === this.props.user_id;
        });
        changingUserUsername = temp.username;
        changingUserId = temp.id;
      }
    }
    return (
      <div className="songsMappedDiv" key={this.props.id}>
        <div className="songsTitleImgFavsUserDiv">
          <h1>Title: {this.props.title}</h1>
          <img src={this.props.img_url} alt="" />

          <h2>
            <Link to={`/profile/${this.props.user_id}`}>
              {changingUserUsername ? changingUserUsername : null}
            </Link>
          </h2>
        </div>
        <FavoriteButtonDisplay
          allFavoritesForUser={this.props.allFavoritesForUser}
          song_id={this.props.song_id}
          isDisplayPosted={this.props.isDisplayPosted}
          allUsers={this.props.allUsers}
        />
        <CommentsDisplay
          allComments={this.props.allComments}
          song_id={this.props.song_id}
          getAllComments={this.props.getAllComments}
          allUsers={this.props.allUsers}
        />
      </div>
    );
  }
}

export default withRouter(SongDisplay);
