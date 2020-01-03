import React from "react";

export default function SortDropdown(props) {
  return (
    <select onChange={props.onChange}>
      <option value={""}>Sort By...</option>
      <option value={"party"}>Party</option>
      <option value={"state"}>State</option>
      <option value={"name"}>Name</option>
      <option value={"terms"}>Terms Served </option>
    </select>
  );
}
