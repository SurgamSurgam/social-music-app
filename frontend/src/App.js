import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import { Nav } from "./components/Nav.js";
import Home from "./components/Home.js";
import SongsContainer from "./containers/SongsContainer.js";
import PopularityContainer from "./containers/PopularityContainer.js";
import GenreContainer from "./containers/GenreContainer.js";
import ProfileContainer from "./containers/ProfileContainer.js";
import OtherProfilesContainer from "./containers/OtherProfilesContainer.js";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route component={Nav} />
        <div className="allAppWithoutNavWrapper">
          <div className="allAppWithoutNavContainer">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/songs" component={SongsContainer} />
              <Route
                exact
                path="/songs/bypop"
                component={PopularityContainer}
              />
              <Route exact path="/songs/bygenre" component={GenreContainer} />
              <Route path="/profile/:id" component={OtherProfilesContainer} />
              <Route exact path="/profile" component={ProfileContainer} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
