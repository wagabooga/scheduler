
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
  let interviewerIDs = dayData.interviewers
  for (const id of interviewerIDs ) {
    result.push(state.interviewers[id])
  } 
  console.log("result", result)
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