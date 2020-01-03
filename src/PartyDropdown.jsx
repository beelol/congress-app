import React from "react";

export default function PartyDropdown(props) {
  return (
    <select onChange={props.onChange}>
      <option value={""}>Party: Any</option>
      <option value={"Republican"}>Republican</option>
      <option value={"Democrat"}>Democrat</option>
      <option value={"Independent"}>Independent</option>
    </select>
  );
}
