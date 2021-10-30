import React from "react";
import classNames from "classnames";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";



export default function InterviewerList(props) {
  const interviewerListItems = props.interviewers.map((interviewerData) => {
    return (
      <InterviewerListItem
        key={interviewerData.id}
        id={interviewerData.id}
        name={interviewerData.name}
        selected={interviewerData.id === props.interviewer}
        setInterviewer={props.setInterviewer}
        avatar={interviewerData.avatar}
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
