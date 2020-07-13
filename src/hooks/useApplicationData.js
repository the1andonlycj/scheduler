//Importing components
//ALL OF THESE IMPORTS ARE FAILING TO POINT TO THE RIGHT FILES.

import { useEffect, useState } from "react";
import axios from "axios";

export default function useApplicationData() {
  const setDay = day => setState({ ...state, day });
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  useEffect(() => {
    const daysPromise = axios.get("http://localhost:3001/api/days")
    const apptmntsPromise = axios.get("http://localhost:3001/api/appointments")
    const interviewersPromise = axios.get("http://localhost:3001/api/interviewers")
    
    Promise.all([
      daysPromise, apptmntsPromise, interviewersPromise
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))
    });
  }, []);

  function cancelInterview(id) {
    const appointments = { ...state.appointments }
    appointments[id].interview = null

    console.log("Here's the state: ", state)
    console.log("Here's the cancelthing appointment: ", appointments[id])
    return axios
      .delete(
        `http://localhost:3001/api/appointments/${id}`
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
        `http://localhost:3001/api/appointments/${id}`,
        { interview }
      )
      .then(r => setState({
        ...state,
        appointments
      })
      )
  }

  return {
    state, 
    setDay,
    bookInterview,
    cancelInterview
  }

}
