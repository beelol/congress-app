import React from "react";
import { Component } from "react";

import MemberView from "./MemberView";
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
      currentPage: 0
    };

    this.membersPerPage = 10;
    this.getCongressMemberData();
  }

  getFirstIndexByPage = page => page * this.membersPerPage;

  getCongressMemberData() {
    return getCongressMembers(data => {
      this.setState({ members: data });
    }).then(() => {
      this.state.members.forEach(member => {
        // console.log(member);
        getCongressMemberImage(
          localURL => this.setState({ [member.id.bioguide]: localURL }),
          member.id.bioguide
        );
      });
    });
  }

  render() {
    return (
      <ul className={"member-list"}>
        {this.state.members
          .slice(
            this.getFirstIndexByPage(this.state.currentPage),
            Math.min(
              this.getFirstIndexByPage(this.state.currentPage) +
                (this.membersPerPage - 1),
              this.state.members.length - 1
            )
          )
          .map(member => {
            let term = member.terms[member.terms.length - 1];
            let gender =
              member.bio.gender.toLowerCase() === "m" ? "man" : "woman";
            let title = term.type == "sen" ? "Senator" : `Congress${gender}`;

            return (
              <li key={member.id.bioguide} className={"member-view"}>
                <MemberView
                  memberName={member.name.official_full}
                  memberImage={this.state[member.id.bioguide]}
                  memberTitle={title}
                  memberParty={term.party}
                  memberState={term.state}
                />
              </li>
            );
          })}
      </ul>
    );
  }
}
