import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    })
  }, [])

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    let newDayData = {}
    let daysCopy = [...state.days]
    for (let i = 0; i < state.days.length; i++) {
      if (state.days[i].appointments.includes(id)){
        newDayData = {...state.days[i], spots: state.days[i].spots - 1}
        daysCopy[i] = newDayData
      }
    }
    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      setState({
        ...state,
        appointments,
        days : daysCopy
      })
    });
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    let newDayData = {}
    let daysCopy = [...state.days]
    for (let i = 0; i < state.days.length; i++) {
      if (state.days[i].appointments.includes(id)){
        newDayData = {...state.days[i], spots: state.days[i].spots + 1}
        daysCopy[i] = newDayData
      }
    }
    return axios.delete(`/api/appointments/${id}`).then(() => {
      setState({
        ...state,
        appointments,
        days: daysCopy
      });
    })
  }


  return { state, setDay, bookInterview, cancelInterview };
};

