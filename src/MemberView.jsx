import React from "react";
import { Component } from "react";

export default class MemberView extends Component {
  render = () => (
    <React.Fragment>
      {this.props.memberImage !== undefined ? (
        <img src={this.props.memberImage} className={"member-image"} />
      ) : (
        undefined
      )}
      {this.props.memberName}
    </React.Fragment>
  );
}
