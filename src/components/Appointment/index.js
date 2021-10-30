import React from "react";
import Header from "./Header.js";
import Empty from "./Empty"

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
      <h2>{formatAppointment(props.time)}</h2>
    </article>
  );
}
