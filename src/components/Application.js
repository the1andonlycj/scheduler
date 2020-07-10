//Importing dependencies/tools from React and Axios
import React, { useState, useEffect } from "react";
import axios from "axios";

//Importing components
import "components/Application.scss";
import DayList from "components/DayList";
import InterviewerList from "components/InterviewerList";
import Appointment from "components/Appointments";
import getAppointmentsForDay from "../helpers/selectors"


//Hardcoded Data
const interviewers = [
  { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
  { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
  { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
  { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
  { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
];


//Functional Data
export default function Application(props) {
  const setDay = day => {setState({ ...state, day })
  console.log("The day is " , day)
  };
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });
 
  console.log("here's the state:", state)
  
  
  let appointments = getAppointmentsForDay(state, state.day);
  console.log("Appointments ahoy: ", appointments)
  
  useEffect(() => {
    const promise1 = axios.get("http://localhost:3001/api/days")
    const promise2 = axios.get("http://localhost:3001/api/appointments")
    
    Promise.all([
      promise1, promise2
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data}))
    })

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
        <InterviewerList interviewers={interviewers} interviewer={state.interviewer} setInterviewer={state.setInterviewer} />
        {
          appointments.map(appointment =>
            <Appointment key={appointment.id} {...appointment} />
          )
        }
      </section>
    </main>
  );


}
