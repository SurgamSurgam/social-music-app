import React from "react";
import { NavLink } from "react-router-dom";

export const Nav = () => {
  return (
    <div className="navWrapper">
      <h2 className="navTitleh2">Earworm Report</h2>
      <nav>
        <NavLink to={"/"}>Home</NavLink>
        <NavLink to={"/songs"}>All Songs</NavLink>
        <NavLink to={"/songs/bypop"}>By Popularity</NavLink>
        <NavLink to={"/songs/bygenre"}>By Genre</NavLink>
        <NavLink to={"/profile"}>My Profile</NavLink>
      </nav>
    </div>
  );
};
