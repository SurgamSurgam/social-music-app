//For favs below----
let answer = [];
if (this.props.allFavoritesForUser) {
  answer = Object.values(this.props.allFavoritesForUser).filter(fav => {
    return song.id === fav.song_id;
  });
}
let favId;
if (answer.length) {
  favId = answer[0].id;
}
//For Favs above

//For comments below
let filteredCommentsArrObj = [];
if (this.props.allComments) {
  filteredCommentsArrObj = Object.values(this.props.allComments).filter(
    comment => comment.song_id === song.id
  );
}

let filteredCommentsMapped;
if (filteredCommentsArrObj.length) {
  filteredCommentsMapped = filteredCommentsArrObj.map(comment => {
    return (
      <div className="commentsContainerDiv">
        <h3>{comment.user_id}</h3>
        <p>{comment.comment_body}</p>
      </div>
    );
  });
}
//For comments above

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
    {favId ? (
      <button onClick={() => this.deleteFavorite(favId)}>Unfavorite</button>
    ) : (
      <button onClick={() => this.addFavorite(song.id)}>Favorite</button>
    )}
    {/*comments can be single component?*/}
    <div className="commentsMainDiv">
      {filteredCommentsMapped === undefined ? null : filteredCommentsMapped}
    </div>
    {/*form part can be component?*/}
    <form className="commentForm" onSubmit={this.handleCommentInputSubmit}>
      <input name="commentInput" type="text" onChange={this.handleChange} />
      <button type="submit">Add Comment</button>
    </form>
  </div>
);
