
export function getAppointmentsForDay(state, dayName) {
  const dayData = state.days.find(day => day.name === dayName)
  let result = []
  if (!dayData) {
    return result
  }
  let appointmentIDs = dayData["appointments"]
  for (let appointmentID of appointmentIDs) {
    result.push(state.appointments[appointmentID])
  }
  return result
}

export function getInterviewersByDay(state, dayName) {
  const dayData = state.days.find(day => day.name === dayName)
  let result = []
  if (!dayData) {
    return result
  }
  let appointmentIDs = dayData["appointments"]
  for (let appointmentID of appointmentIDs) {
    let appointment = state.appointments[parseInt(appointmentID)]
    if (appointment["interview"]) {
      const interviewerID = parseInt(appointment["interview"].interviewer)
      result.push(state.interviewers[interviewerID])
    }
  }
  return result
}

export function getInterview(state, interview) {
  if (!interview){
    return null
  }
  let result = {
    interviewer: {
      avatar: state.interviewers[interview.interviewer.toString()].avatar,
      id : state.interviewers[interview.interviewer].id,
      name : state.interviewers[interview.interviewer].name
    },
    student: interview.student
  }
  return result
}