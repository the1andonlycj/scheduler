//Selector code for extracting appointments from state object
export default function getAppointmentsForDay(state, day) {

  let match = state.days.find(obj => obj.name === day);
  if(match) {
    let matchedAppointments = match.appointments
    let scheduledAppointments = matchedAppointments.map(apptmntNum =>  state.appointments[apptmntNum])
    return scheduledAppointments
  } else {
    return [];
  }
}