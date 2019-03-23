import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import CommentsDisplay from "./CommentsDisplay.js";
import FavoriteButtonDisplay from "./FavoriteButtonDisplay.js";
import { getAllUsers } from "../../actions/ProfileActions.js";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    allUsers: state.profile.allUsers
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllUsers: () => dispatch(getAllUsers())
  };
};

class SongDisplay extends React.Component {
  render() {
    let changingUserUsername = [];
    // let changingUserId = [];
    if (this.props.allUsers) {
      if (this.props.allUsers.length) {
        let temp = Object.values(this.props.allUsers).find(user => {
          return user.id === this.props.user_id;
        });
        changingUserUsername = temp.username;
        // changingUserId = temp.id;
      }
    }
    return (
      <div className="songsMappedDiv" key={this.props.id}>
        <div className="songsTitleImgFavsUserDivWrapper">
          <div className="imgContainer">
            <img className="SongDisplayImg" src={this.props.img_url} alt="" />
          </div>

          <div className="songsTitleFavsUserDiv">
            <h1 className="songDisplayTitle songTitle">{this.props.title}</h1>

            <h2 className="songDisplayUsername username">
              <Link to={`/profile/${this.props.user_id}`}>
                {changingUserUsername
                  ? changingUserUsername
                  : "No Username Available"}
              </Link>
            </h2>
          </div>

          <div className="favoriteButtonWrapperOnSongDisplay">
            <FavoriteButtonDisplay
              allUsers={this.props.allUsers}
              allFavoritesForUser={this.props.allFavoritesForUser}
              song_id={this.props.song_id}
              isDisplayPosted={this.props.isDisplayPosted}
            />
          </div>
        </div>
        <div className="commentsWrapperOnSongDisplay">
          <CommentsDisplay
            allUsers={this.props.allUsers}
            allComments={this.props.allComments}
            song_id={this.props.song_id}
            getAllComments={this.props.getAllComments}
          />
        </div>
      </div>
    );
  }
}

// export default withRouter(SongDisplay);
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SongDisplay)
);
