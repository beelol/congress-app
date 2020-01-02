import React from "react";
import { Component } from "react";

export default class MemberView extends Component {
  render = () => (
    <React.Fragment>
      {this.props.memberImage !== undefined ? (
        <img alt="" src={this.props.memberImage} className={"member-image"} />
      ) : (
        undefined
      )}
      <div className={"member-view-info"}>
        <div className={"member-name"}>{this.props.memberName}</div>
        <div>{this.props.memberTitle}</div>
        <div>{this.props.memberParty}</div>
        <div>{this.props.memberState}</div>
      </div>
    </React.Fragment>
  );
}
