import React from "react";
import { Component } from "react";

export default class PageControl extends Component {
  render = () => (
    <div className={"page-control"}>
      <button>{"<"}</button>
      <button>{"1"}</button>
      <button>{"2"}</button>
      <button>{"3"}</button>
      <button>{"4"}</button>
      <button>{"5"}</button>
      <button>{">"}</button>
    </div>
  );
}