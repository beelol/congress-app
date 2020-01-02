import React from "react";
import { Component } from "react";

export default class Search extends Component {
  constructor() {
    super();

    this.state = {
      query: ""
    };
  }

  render() {
    return <input className="member-search" placeholder="Search..."></input>;
  }
}
