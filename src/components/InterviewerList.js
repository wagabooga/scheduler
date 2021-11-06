import React from "react";
import classNames from "classnames";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";
import PropTypes from 'prop-types';



export default function InterviewerList(props) {
  
  const interviewerListItems = props.interviewers.map((interviewerData) => {
    return (
      <InterviewerListItem
        key={interviewerData.id}
        name={interviewerData.name}
        avatar={interviewerData.avatar}
        selected={interviewerData.id === props.value}
        setInterviewer={() => props.onChange(interviewerData.id)}
      />
    );
  });
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewerListItems}
      </ul>
    </section>
  );
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};
