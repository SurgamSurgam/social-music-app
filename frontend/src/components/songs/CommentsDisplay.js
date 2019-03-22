import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import axios from "axios";

class CommentsDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = { commentInput: "", allUserFromProps: [] };
  }

  componentDidMount() {
    if (this.props.allUsers) {
      this.setState({
        allUserFromProps: this.props.allUsers
      });
    }
  }

  handleCommentInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleCommentInputSubmit = async (e, songId) => {
    //default user is 1
    e.preventDefault();

    await axios.post("/api/comments", {
      comment_body: this.state.commentInput,
      user_id: 1,
      song_id: +songId
    });

    await this.setState({
      commentInput: ""
    });

    this.props.getAllComments();
  };

  render() {
    let filteredCommentsArrObj = [];
    if (this.props.allComments) {
      filteredCommentsArrObj = Object.values(this.props.allComments).filter(
        comment => {
          return comment.song_id === this.props.song_id;
        }
      );
    }

    let filteredCommentsMapped;
    // let changingUserUsername = [];
    // let changingUserId = [];

    // // for users' username
    // if (this.props.allUsers) {
    //   debugger;
    //   if (this.props.allUsers.length) {
    //     let temp = Object.values(this.props.allUsers).find(user => {
    //       return user.id === comment.user_id;
    //     });
    //     changingUserUsername = temp.username;
    //     changingUserId = temp.id;
    //   }
    // }

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
        <form
          className="commentForm"
          onSubmit={e => {
            this.handleCommentInputSubmit(e, this.props.song_id);
          }}
        >
          <input
            name="commentInput"
            type="text"
            value={this.state.commentInput}
            onChange={this.handleCommentInputChange}
          />
          <button type="submit">Add Comment</button>
        </form>
      </div>
    );
  }
}

export default withRouter(CommentsDisplay);
