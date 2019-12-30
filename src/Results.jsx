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
      imageTable: {}
    };

    this.getCongressMemberData();
  }

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
        {this.state.members.map(member => {
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
