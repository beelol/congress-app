import React from "react";
import { Component } from "react";

export default class PageControl extends Component {
  // clamp to zero if 2 less than the current page is negative.
  getFirstPageButtonIndex = currentPage => Math.max(0, currentPage - 2);

  getPageIndexButtons = () => {
    let buttons = [];

    let firstButtonIndex = this.getFirstPageButtonIndex(this.props.currentPage);
    let lastButtonIndex = Math.min(firstButtonIndex + 4, this.props.lastPage);

    for (let i = 4; i >= 0; i--) {
      let currentElement = lastButtonIndex - 4 + i;

      buttons.unshift(
        currentElement === this.props.currentPage ? (
          <button className={"current-page-button"}>
            {currentElement + 1}
          </button>
        ) : (
          <button
            onClick={() => {
              this.props.setPage(currentElement);
            }}
          >
            {currentElement + 1}
          </button>
        )
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
