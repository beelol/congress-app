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
          return (
            <li key={member.id.bioguide}>
              <MemberView
                memberName={member.name.official_full}
                memberImage={this.state[member.id.bioguide]}
              />
            </li>
          );
        })}
      </ul>
    );
  }
}
