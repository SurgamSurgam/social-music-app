import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import CommentsDisplay from "./CommentsDisplay.js";
import FavoriteButtonDisplay from "./FavoriteButtonDisplay.js";

class SongDisplay extends React.Component {
  render() {
    return (
      <div className="songsMappedDiv" key={this.props.id}>
        <div className="songsTitleImgFavsUserDiv">
          <h1>Title: {this.props.title}</h1>
          <img src={this.props.img_url} alt="" />

          <h2>
            User's username HERE!{" "}
            <Link to={"/profile"}>{this.props.user_id}</Link>
          </h2>
        </div>
        <FavoriteButtonDisplay
          allFavoritesForUser={this.props.allFavoritesForUser}
          song_id={this.props.song_id}
          isDisplayPosted={this.props.isDisplayPosted}
        />
        <CommentsDisplay
          allComments={this.props.allComments}
          song_id={this.props.song_id}
          getAllComments={this.props.getAllComments}
        />
      </div>
    );
  }
}

export default withRouter(SongDisplay);
