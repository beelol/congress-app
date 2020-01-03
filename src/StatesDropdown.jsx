import React from "react";
import { states } from "./states";

export default function StatesDropdown(props) {
  return (
    <select onChange={props.onChange}>
      <option value={""}>All</option>
      {Object.keys(states).map(symbol => (
        <option value={symbol}>{states[symbol]}</option>
      ))}
    </select>
  );
}
