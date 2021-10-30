import React from "react";
import classNames from "classnames";
import "components/InterviewerListItem.scss"

export default function InterviewerListItem(props) {

  
  const interviewerItemClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected === true,
  });
  let selectedName = null
  if (props.selected === true) {
    selectedName = props.name
  }
  return (
    <li
      className={interviewerItemClass}
      onClick={() => props.setInterviewer(props.id)}
    >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {selectedName}
    </li>
  );
}
