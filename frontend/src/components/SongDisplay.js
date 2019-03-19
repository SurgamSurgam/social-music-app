import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import CommentsDisplay from "./CommentsDisplay.js";

class SongDisplay extends React.Component {
  render() {
    //For favs below----
    let answer = [];
    if (this.props.allFavoritesForUser) {
      answer = Object.values(this.props.allFavoritesForUser).filter(fav => {
        return this.props.song_id === fav.song_id;
      });
    }
    let favId;
    if (answer.length) {
      favId = answer[0].id;
    }
    //For Favs above

    return (
      <div className="songsMappedDiv" key={this.props.id}>
        <h1>Title: {this.props.title}</h1>
        <img src={this.props.img_url} alt="" />
        <h2>
          Favorited {this.props.favorited_count}{" "}
          {this.props.favorited_count === 1 ? "time" : "times"}
        </h2>
        <h2>
          User's username HERE!{" "}
          <Link to={"/profile"}>{this.props.user_id}</Link>
        </h2>
        {favId ? (
          <button onClick={() => this.props.deleteFavorite(favId)}>
            Unfavorite
          </button>
        ) : (
          <button onClick={() => this.props.addFavorite(this.props.song_id)}>
            Favorite
          </button>
        )}
        <CommentsDisplay
          allComments={this.props.allComments}
          song_id={this.props.song_id}
        />
      </div>
    );
  }
}

export default withRouter(SongDisplay);
