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
import Error from "./Error.js";



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
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const EDITING = "EDITING";
const ERROR_SAVE = "ERROR_SAVE"
const ERROR_DELETE = "ERROR_DELETE"
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
      .catch(() => {transition(ERROR_SAVE, true)})
  }

  function transitionToConfirm() {
    transition(CONFIRM)
  }


  function confirmDelete(id) {
    transition(DELETING, true)
    cancelInterview(id)
    .then(() => { transition(EMPTY) })
    .catch(() => {transition(ERROR_DELETE, true)})
  }

  function transitionToEditing(){
    transition(EDITING)
  }
  if (mode === EDITING){
    console.log("props.interview.interviewer", props.interview.interviewer)

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
          onEdit={transitionToEditing}
        />
      )}
      {mode === CREATE && (
        <Form onCancel={back}
          onSave={(name, interviewer) => {save(name, interviewer)}}
          interviewers={props.interviewers}
        />
      )}
      {mode === EDITING && (
        <Form 
        onCancel={back}
        onSave={(name, interviewer) => {save(name, interviewer)}}
        interviewers={props.interviewers}
        student={props.interview.student}
        interviewer={props.interview.interviewer.id}
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
      {mode === ERROR_SAVE && (
        <Error message={"Could not save"} onClose={() => {back()}} />
      )}
      {mode === ERROR_DELETE && (
        <Error message={"Could not delete"} onClose={() => {back()}}/>
      )}
    </article>
  );
}
