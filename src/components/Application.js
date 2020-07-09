import React, { useState } from "react";

import "components/Application.scss";
import DayList from "components/DayList"
import InterviewerList from "components/InterviewerList"
import Appointment from "components/Appointments"

const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];

const interviewers = [
  { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
  { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
  { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
  { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
  { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
];

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
    {
    id: 3,
    time: "3pm",
    interview: {
      student: "Giggly Puff",
      interviewer: {
        id: 1,
        name: "Bees?",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
    {
    id: 4,
    time: "4pm",
    interview: {
      student: "Old Man Jenkums",
      interviewer: {
        id: 1,
        name: "Marlboro Macaque",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
    {
    id: 5,
    time: "5pm",
    interview: {
      student: "Pantsu No Dorobo",
      interviewer: {
        id: 1,
        name: "Bitsy, the Savant Chihuahua",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  }
];

export default function Application(props) {
  const [day, setDay] = useState("Monday")
  const [interviewer, setInterviewer] = useState("3")
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
          <DayList days={days} day={day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        <InterviewerList interviewers={interviewers} interviewer={interviewer} setInterviewer={setInterviewer} />
        {
          appointments.map(appointment =>
            <Appointment key={appointment.id} {...appointment} />
            
          )
        }
      </section>
    </main>
  );


}
