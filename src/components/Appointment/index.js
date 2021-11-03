import React from "react";
import Header from "./Header.js";
import Show from "./Show.js";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode.js";

import "components/Appointment/styles.scss";
import Form from "./Form.js";
import Status from "./Status.js";
import cancelInterview from "../Application"
import Confirm from "./Confirm.js";
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
const SAVING = "SAVING";
const CONFIRM = "CONFIRM"
const DELETING = "DELETING"
export default function Appointment(props) {
  const bookInterview = props.bookInterview
  const cancelInterview = props.cancelInterview

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    bookInterview(props.id, interview)
      .then(() => { transition(SHOW) })
  }

  function transitionToConfirm() {
    transition(CONFIRM)
  }


  function confirmDelete(id) {
    transition(DELETING)
    cancelInterview(id).then(() => { transition(EMPTY) })
  }
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && props.interview && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={transitionToConfirm}
        />
      )}
      {mode === CREATE && (
        <Form onCancel={back}
          onSave={(name, interviewer) => {save(name, interviewer)}}
          interviewers={props.interviewers}
        />
      )}
      {mode === SAVING && (
        <Status message={"Saving"} />
      )}
      {mode === DELETING && (
        <Status message={"Deleting"} />
      )}
      {mode === CONFIRM && (
        <Confirm onCancel={back} onConfirm={() => { confirmDelete(props.id) }} message={"Are you sure you would like to delete?"} />
      )}

    </article>
  );
}
