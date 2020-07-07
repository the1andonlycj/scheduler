import React from "react";
import "styles/InterviewerListItem.scss";
const classnames = require('classnames');


export default function InterviewerListItem(props) {
  const interviewClass = classnames("interviewers__item", {
    "interviewers__item--selected": props.selected,
    "interviewers__item--selected-image": props.selected 


  })

  return (
    <li 
    className={interviewClass}>
      <img
        onClick={() => props.setInterviewer(props.name)}
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && 
        <p>{props.name}</p>  //is this p tag ok?
      }
    </li>
  );
}