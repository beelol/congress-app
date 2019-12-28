import React from "react";
import { getCongressMembers } from "./GetCongressMembers";

export default class Results extends React.Component {
  constructor() {
    super();

    this.state = {
      members: []
    };

    getCongressMembers(data => this.setState({ members: data }));
  }

  render() {
    console.log(this.state.members);

    return (
      <ul>
        {this.state.members.map(member => {
          return <li>{member.name.first}</li>;
        })}
      </ul>
    );
  }
}
