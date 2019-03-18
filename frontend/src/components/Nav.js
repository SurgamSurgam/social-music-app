import React from "react";
import { Link } from "react-router-dom";

export const Nav = () => {
  return (
    <nav>
      <Link to={"/"}>Home</Link>
      <Link to={"/songs"}>All Songs</Link>
      <Link to={"/songs/bypop"}>By Popularity</Link>
      <Link to={"/songs/bygenre"}>By Genre</Link>
      <Link to={"/profile"}>My Profile</Link>
    </nav>
  );
};
