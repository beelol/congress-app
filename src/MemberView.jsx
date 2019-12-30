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
      <div className={"member-view-info"}>
        <div>{this.props.memberName}</div>
        <div>{this.props.memberTitle}</div>
        <div>{this.props.memberParty}</div>
        <div>{this.props.memberState}</div>
      </div>
    </React.Fragment>
  );
}
