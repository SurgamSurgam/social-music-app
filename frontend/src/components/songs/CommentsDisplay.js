import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

class CommentsDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = { commentInput: "" };
  }

  handleCommentInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleCommentInputSubmit = e => {
    e.preventDefault();
    console.log(`submitted my comment ${this.state.commentInput}`);
    this.setState({
      commentInput: ""
    });
  };

  render() {
    console.log("CommentsDisplay Component: ", this.state);
    //For comments below
    let filteredCommentsArrObj = [];
    if (this.props.allComments) {
      filteredCommentsArrObj = Object.values(this.props.allComments).filter(
        comment => comment.song_id === this.props.song_id
      );
    }

    let filteredCommentsMapped;
    if (filteredCommentsArrObj.length) {
      filteredCommentsMapped = filteredCommentsArrObj.map(comment => {
        return (
          <div className="commentsInnerDiv" key={comment.id}>
            <Link to={"/profile"}>
              <h3>{comment.user_id}</h3>
            </Link>
            <p>{comment.comment_body}</p>
          </div>
        );
      });
    }

    return (
      <div className="commentsWrapper">
        <div className="commentsMainDiv">
          {filteredCommentsMapped === undefined ? null : filteredCommentsMapped}
        </div>
        <form className="commentForm" onSubmit={this.handleCommentInputSubmit}>
          <input
            name="commentInput"
            type="text"
            onChange={this.handleCommentInputChange}
          />
          <button type="submit">Add Comment</button>
        </form>
      </div>
    );
  }
}

export default withRouter(CommentsDisplay);
