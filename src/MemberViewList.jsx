import React from "react";
import MemberView from "./MemberView";
import { states } from "./states";

export default function MemberViewList(props) {
  return (
    <ul className={"member-list"}>
      {props.members
        .slice(
          props.firstPageIndex,
          Math.min(
            props.firstPageIndex + (props.membersPerPage - 1),
            props.members.length
          )
        )
        .map(member => {
          let term = member.terms[member.terms.length - 1];
          let gender =
            member.bio.gender.toLowerCase() === "m" ? "man" : "woman";
          let title = term.type === "sen" ? "Senator" : `Congress${gender}`;

          return (
            <li key={member.id.bioguide} className={"member-view"}>
              <MemberView
                memberName={member.name.official_full}
                memberImage={props.memberImages[member.id.bioguide]}
                memberTitle={title}
                memberParty={term.party}
                memberState={states[term.state]}
              />
            </li>
          );
        })}
    </ul>
  );
}
