import React from "react";
import Header from "./Header.js";
import Show from "./Show.js";
import Empty from "./Empty";

import "components/Appointment/styles.scss";

// helper function
const formatAppointment = function (time) {
  if (!time) {
    return "No Appointments";
  } else if (time) {
    return `Appointment at ${time}`;
  }
};

export default function Appointment(props) {
  return (
    <article className="appointment">
      <Header time={props.time} />
      {props.interview ? (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      ) : (
        <Empty />
      )}
    </article>
  );
}
