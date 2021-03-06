//Creating list of interviewers

import React from "react";
import "styles/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem";
import PropTypes from 'prop-types';

InterviewerList.propTypes = {
  interviewer: PropTypes.number,
  onChange: PropTypes.func.isRequired
};

export default function InterviewerList(props) {
  return (
    <section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewer</h4>
    <ul className="interviewers__list">
        {props.interviewers.map(interviewer =>         
        <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.interviewer}
        setInterviewer={event => props.onChange(interviewer.id)}
        />)}
    </ul>
  </section>
  );
}