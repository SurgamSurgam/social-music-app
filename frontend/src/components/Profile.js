import React from "react";
import SongDisplay from "./songs/SongDisplay.js";

class Profile extends React.Component {
  state = {
    displayToggle: false
  };

  componentDidMount() {
    this.props.getAllSongsPostedByOneUser();
    this.props.getAllFavoritesForOneUser();
    this.props.getAllComments();
  }
  render() {
    debugger;
    console.log(this.props);
    return <h1>PROFILE PAGE</h1>;
  }
}

export default Profile;
