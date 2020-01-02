import React from "react";
import { Component } from "react";
import PageControl from "./PageControl";
import { Search } from "./Search";

import MemberViewList from "./MemberViewList";
import {
  getCongressMembers,
  getCongressMemberImage
} from "./GetCongressMembers";

import FuzzySearch from "fuzzy-search";

export default class Results extends Component {
  constructor() {
    super();

    this.state = {
      members: [],
      imageTable: {},
      currentPage: 0,
      memberImages: {},
      searchTerm: "",
      stateFilter: "",
      partyFilter: ""
    };

    this.allMembers = [];
    this.membersPerPage = 10;
    this.getCongressMemberData().then(() => this.updateMemberList());
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
      this.searcher = new FuzzySearch(this.allMembers, ["name.official_full"], {
        caseSensitive: false,
        sort: true
      });
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

  updateMemberList() {
    this.setState({
      members: this.filterByParty(
        this.filterByState(this.searcher.search(this.state.searchTerm))
      )
    });
  }

  updateSearchTerm(e) {
    let searchTerm = e.target.value;

    const newMembers = this.filterByParty(
      this.filterByState(this.searcher.search(searchTerm))
    );

    this.setState({
      searchTerm: searchTerm,
      members: newMembers,
      currentPage: 0
    });
  }

  filterByState(members) {
    // return the same list if there is no state filter.
    if (this.state.stateFilter.length <= 0) return members;

    return members.filter(member => {
      let term = member.terms[member.terms.length - 1];

      return term.state.toLowerCase() === this.state.stateFilter.toLowerCase();
    });
  }

  filterByParty(members) {
    // return the same list if there is no party filter.
    if (this.state.partyFilter.length <= 0) return members;

    return members.filter(member => {
      let term = member.terms[member.terms.length - 1];

      return term.party.toLowerCase() === this.state.partyFilter.toLowerCase();
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
