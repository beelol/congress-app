import React from "react";
import { Component } from "react";
import PageControl from "./PageControl";
import { Search } from "./Search";
import StatesDropdown from "./StatesDropdown";
import PartyDropdown from "./PartyDropdown";
import SortDropdown from "./SortDropdown";
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
      partyFilter: "",
      sortTerm: ""
    };

    this.allMembers = [];
    this.membersPerPage = 10;
    this.getCongressMemberData();

    this.searcher = new FuzzySearch(this.allMembers, ["name.official_full"], {
      caseSensitive: false,
      sort: true
    });
  }

  getNumPages = membersToDisplay =>
    Math.ceil(membersToDisplay.length / this.membersPerPage);

  cycleToNextPage = displayMembers =>
    this.setState({
      currentPage: Math.min(
        this.state.currentPage + 1,
        this.getNumPages(displayMembers) - 1
      )
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

  updateSearchTerm(e) {
    let searchTerm = e.target.value;

    this.setState({
      searchTerm: searchTerm,
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

  setStateFilter(e) {
    let stateFilter = e.target.value;

    this.setState({ stateFilter: stateFilter, currentPage: 0 });
  }

  setPartyFilter(e) {
    let partyFilter = e.target.value;

    this.setState({ partyFilter: partyFilter, currentPage: 0 });
  }

  setSortTerm(e) {
    let sortTerm = e.target.value;

    this.setState({ sortTerm: sortTerm });
  }

  sortMembers(members) {
    let comparisonFunction = (member1, member2) => {};

    switch (this.state.sortTerm) {
      case "party":
        // comparisonFunction = members.sort();
        break;
      case "state":
        comparisonFunction = (member1, member2) => {
          let state1 = member1.terms[member1.terms.length - 1].state;
          let state2 = member2.terms[member2.terms.length - 1].state;

          if (state1 < state2) return -1;
          if (state1 > state2) return 1;

          return 0;
        };
        break;
      case "name":
        comparisonFunction = (member1, member2) => {
          let name1 = member1.name.official_full.toUpperCase();
          let name2 = member2.name.official_full.toUpperCase();

          if (name1 < name2) return -1;
          if (name1 > name2) return 1;

          return 0;
        };
        break;
      case "terms":
        break;
      default:
        return members;
    }

    return members.sort(comparisonFunction);
  }

  render() {
    console.log(this.state.stateFilter);

    const displayMembers = this.sortMembers(
      this.filterByParty(
        this.filterByState(this.searcher.search(this.state.searchTerm))
      )
    );

    return (
      <div className="app-container">
        <div className="filter-options">
          <Search updateSearchTerm={this.updateSearchTerm.bind(this)} />
          <StatesDropdown onChange={this.setStateFilter.bind(this)} />
          <PartyDropdown onChange={this.setPartyFilter.bind(this)} />
          <SortDropdown onChange={this.setSortTerm.bind(this)} />
        </div>
        <MemberViewList
          members={displayMembers}
          memberImages={this.state.memberImages}
          firstPageIndex={this.getFirstIndexByPage(this.state.currentPage)}
          membersPerPage={this.membersPerPage}
        />
        <PageControl
          nextPageEvent={this.cycleToNextPage.bind(this, displayMembers)}
          previousPageEvent={this.cycleToPreviousPage.bind(this)}
          currentPage={this.state.currentPage}
          lastPage={this.getNumPages(displayMembers) - 1}
          setPage={this.setPage.bind(this)}
        />
      </div>
    );
  }
}
