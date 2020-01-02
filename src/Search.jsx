import React from "react";

export const Search = props => (
  <input
    className="member-search"
    placeholder="Search..."
    onChange={props.updateSearchTerm}
  ></input>
);
