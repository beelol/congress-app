import React from "react";
import { Component } from "react";
import PageControl from "./PageControl";
import { Search } from "./Search";

import MemberViewList from "./MemberViewList";
import {
  getCongressMembers,
  getCongressMemberImage
} from "./GetCongressMembers";

export default class Results extends Component {
  constructor() {
    super();

    this.state = {
      members: [],
      imageTable: {},
      currentPage: 0,
      memberImages: {},
      searchTerm: ""
    };

    this.allMembers = [];
    this.membersPerPage = 10;
    this.getCongressMemberData();
  }

  getNumPages = () =>
    Math.ceil(this.state.members.length / this.membersPerPage);

  cycleToNextPage = () =>
    this.setState({
      currentPage: Math.min(this.state.currentPage + 1, this.getNumPages() - 1)
    });

  cycleToPreviousPage = () =>
    this.setState({ currentPage: Math.max(this.state.currentPage - 1, 0) });

  setPage = newPage => {
    this.setState({ currentPage: newPage });
  };

  getFirstIndexByPage = page => page * this.membersPerPage;

  getCongressMemberData() {
    return getCongressMembers(data => {
      this.allMembers = data;
      this.setState({ members: this.allMembers });
    }).then(() => {
      let memberImages = { ...this.state.memberImages };
      this.state.members.forEach(member => {
        getCongressMemberImage(localURL => {
          memberImages[member.id.bioguide] = localURL;
          this.setState({ memberImages: memberImages });
        }, member.id.bioguide);
      });
    });
  }

  updateSearchTerm(e) {
    let searchTerm = e.target.value;
    let newMembers = this.allMembers.filter(member =>
      member.name.official_full.toLowerCase().includes(searchTerm.toLowerCase())
    );

    this.setState({
      members: newMembers
    });
  }

  render() {
    return (
      <div className="app-container">
        <Search updateSearchTerm={this.updateSearchTerm.bind(this)} />
        <MemberViewList
          members={this.state.members}
          memberImages={this.state.memberImages}
          firstPageIndex={this.getFirstIndexByPage(this.state.currentPage)}
          membersPerPage={this.membersPerPage}
        />
        <PageControl
          nextPageEvent={this.cycleToNextPage.bind(this)}
          previousPageEvent={this.cycleToPreviousPage.bind(this)}
          currentPage={this.state.currentPage}
          lastPage={this.getNumPages() - 1}
          setPage={this.setPage.bind(this)}
        />
      </div>
    );
  }
}
