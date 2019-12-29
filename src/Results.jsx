import React from "react";
import {
  getCongressMembers,
  getCongressMemberImage
} from "./GetCongressMembers";

export default class Results extends React.Component {
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
      <ul>
        {this.state.members.map(member => {
          return (
            <li key={member.id.bioguide}>
              {this.state[member.id.bioguide] !== undefined ? (
                <img src={this.state[member.id.bioguide]} />
              ) : (
                undefined
              )}
              {member.name.official_full}
            </li>
          );
        })}
      </ul>
    );
  }
}
