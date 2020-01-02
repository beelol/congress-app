import React from "react";
import { Component } from "react";

export default class PageControl extends Component {
  // clamp to zero if 2 less than the current page is negative.
  getFirstPageButtonIndex = currentPage => Math.max(0, currentPage - 2);

  getPageIndexButtons = () => {
    let buttons = [];

    let firstButtonIndex = this.getFirstPageButtonIndex(this.props.currentPage);
    let lastButtonIndex = firstButtonIndex + 5;

    for (let i = firstButtonIndex; i < lastButtonIndex; i++) {
      if (i >= this.props.lastPage) break;

      buttons.push(
        <button
          className={i === this.props.currentPage ? "current-page-button" : ""}
          onClick={() => {
            this.props.setPage(i);
          }}
        >
          {i + 1}
        </button>
      );
    }

    return buttons;
  };

  render = () => (
    <div className={"page-control"}>
      <button onClick={this.props.previousPageEvent}>{"<"}</button>
      {this.getPageIndexButtons()}
      <button onClick={this.props.nextPageEvent}>{">"}</button>
    </div>
  );
}
