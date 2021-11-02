import React from "react";
import Header from "./Header.js";
import Show from "./Show.js";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode.js";

import "components/Appointment/styles.scss";
import Form from "./Form.js";

// helper function
const formatAppointment = function (time) {
  if (!time) {
    return "No Appointments";
  } else if (time) {
    return `Appointment at ${time}`;
  }
};



const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );



  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() =>  transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && (
        <Form onCancel={back}
        interviewers={[]}
        />
      )}
    </article>
  );
}
