//Importing dependencies/tools from React and Axios
import React, { useState, useEffect } from "react";
import axios from "axios";

//Importing components
import "components/Application.scss";
import DayList from "components/DayList";
import InterviewerList from "components/InterviewerList";
import Appointment from "components/Appointments";
import { getAppointmentsForDay, getInterview } from "../helpers/selectors";


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
 
  const appointments = getAppointmentsForDay(state, state.day); //??????

  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
      />
    );
  });
  
  useEffect(() => {
    console.log("hey")
    const daysPromise = axios.get("http://localhost:3001/api/days")
    const apptmntsPromise = axios.get("http://localhost:3001/api/appointments")
    const interviewersPromise = axios.get("http://localhost:3001/api/interviewers")
    
    Promise.all([
      daysPromise, apptmntsPromise, interviewersPromise
    ]).then((all) => {
      console.log("That's all folks: " , all[2])
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
    });
  }, []);

  console.log(state.interviewers)

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
        {
          appointments.map(appointment =>
            <Appointment key={appointment.id} {...appointment} />
          )
        }
      </section>
    </main>
  );


}
