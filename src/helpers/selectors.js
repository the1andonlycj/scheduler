//Selector code for extracting appointments from state object
export function getAppointmentsForDay(state, day) {

  let match = state.days.find(obj => obj.name === day);
  if(match) {
    let matchedAppointments = match.appointments
    let scheduledAppointments = matchedAppointments.map(apptmntNum =>  state.appointments[apptmntNum])
    return scheduledAppointments
  } else {
    return [];
  }
};

export function getInterview(state, interview) {
   
  let interviewObject = {};
  for(let interviewerId in state.interviewers) {
    if(interview) {
      let intInterviewer = interview.interviewer;
      let stateInterviewer = interviewerId;
      if(intInterviewer.toString() === stateInterviewer.toString()) {
        interviewObject = { 
          ...interview, 
          interviewer: state.interviewers[interviewerId]
        }
        return interviewObject;
      }
    }
  }
  return null
};

export function getInterviewersForDay(state, day) {
  let match = state.days.find(obj => obj.name === day);
  if (match) {
    let matchedInterviewers = match.interviewers
    let scheduledInterviewers = matchedInterviewers.map(interviewerId => state.interviewers[interviewerId])
    return scheduledInterviewers
  } else {
    return [];
  }
};