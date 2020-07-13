//Importing dependencies/tools from React and Axios
import React, { useState, useEffect } from "react";
import axios from "axios";

//Importing components
import "components/Application.scss";
import DayList from "components/DayList";
import InterviewerList from "components/InterviewerList";
import Appointment from "components/Appointments";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors";


//Hardcoded Data

//Functional Data
export default function Application(props) {
  const setDay = day => setState({ ...state, day });
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  function cancelInterview(id) {
    const deletePlz = [id].interview;
    const appointments = {...state.appointments, deletePlz: null}
    console.log("Here's the state: ", state)
    console.log("Here's the cancelthing appointment: ", appointments[id])
    axios
      .delete(
        `http://localhost:3001/api/appointments/${id}`
      )
      .then(r => setState({
        ...state,
        appointments
      })
      )
      .catch(e => console.log("The DELETE DID NOT WORK"));
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

    axios
      .put(
        `http://localhost:3001/api/appointments/${id}`,
        {interview}
        //{ headers: { "Content-Type": "text/plain" } }
      )
      .then(r => setState({
        ...state,
        appointments
      })
      )
      .catch(e => console.log("The Put DID NOT WORK"));


  }
 
  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day)
  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        {...appointment}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });
  
  useEffect(() => {
    const daysPromise = axios.get("http://localhost:3001/api/days")
    const apptmntsPromise = axios.get("http://localhost:3001/api/appointments")
    const interviewersPromise = axios.get("http://localhost:3001/api/interviewers")
    
    Promise.all([
      daysPromise, apptmntsPromise, interviewersPromise
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
    });
  }, []);

  return (
    <main className="layout">
      <section className="sidebar">
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        {/* {
          appointments.map(appointment =>
            <Appointment 
            key={appointment.id} />
          )
        } */}
      </section>
    </main>
  );


}
