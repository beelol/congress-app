import React from "react";
import { states } from "./states";

export default function PartyDropdown(props) {
  return (
    <select onChange={props.onChange}>
      <option value={"Republican"}>Republican</option>
      <option value={"Democrat"}>Democrat</option>
      <option value={"Independent"}>Independent</option>
    </select>
  );
}
