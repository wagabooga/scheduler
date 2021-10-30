
export function getAppointmentsForDay(state, dayName) {
  const dayData = state.days.find(day => day.name === dayName)
  const result = []
  if (!dayData){
    return result
  }
  let appointmentIDs = dayData["appointments"]
  for (let appointmentID of appointmentIDs) {
    result.push(state.appointments[appointmentID])
  }
  return result
}

