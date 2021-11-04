import React from "react";
import DayList from "./DayList";
import { getAppointmentsForDay, getInterview, getInterviewersByDay } from "helpers/selectors";
import Appointment from "./Appointment/index.js";
import useApplicationData from "hooks/useApplicationData";
import "components/Application.scss";



export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  const dailyAppointments = getAppointmentsForDay(state, state.day)
  const dailyInterviewers = getInterviewersByDay(state, state.day)
  const appointments = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment cancelInterview={cancelInterview} bookInterview={bookInterview} key={appointment.id} 
      {...appointment} interview={interview} interviewers={dailyInterviewers} />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} value={state.day} onChange={(day) => { setDay(day) }} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointments}
      </section>
    </main>
  );
}
