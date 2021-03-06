//Importing components
import { useEffect, useState } from "react";
import axios from "axios";

//Exporting the function to make Application.js work properly:
export default function useApplicationData() {
  const setDay = day => setState({ ...state, day });
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  useEffect(() => {
    const daysPromise = axios.get("/api/days")
    const apptmntsPromise = axios.get("/api/appointments")
    const interviewersPromise = axios.get("/api/interviewers")
    
    Promise.all([
      daysPromise, apptmntsPromise, interviewersPromise
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))
    });
  }, []);

  function cancelInterview(id) {
    const appointments = { ...state.appointments }
    appointments[id].interview = null
    return axios
      .delete(
        `/api/appointments/${id}`
      )
      .then(r => setState({
        ...state,
        appointments
      })
      )
  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios
      .put(
        `/api/appointments/${id}`,
        { interview }
      )
      .then(r => setState({
        ...state,
        appointments
      })
      )
  }

  function updateSpotsRemaining(spotChange) {
    const days = { ...state.days };
    let selectedDay = 0;
    for(const day in days) {
      if(days[day].name === state.day) {
        selectedDay = days[day].id - 1
      }
    }
    const spotsRemaining = days[selectedDay].spots + spotChange;
    days[selectedDay].spots = spotsRemaining
  }

  return {
    state, 
    setDay,
    bookInterview,
    cancelInterview,
    updateSpotsRemaining
  }

}
