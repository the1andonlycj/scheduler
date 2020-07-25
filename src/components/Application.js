//Importing dependencies/tools from React and Axios
import React from "react";
import useApplicationData from "hooks/useApplicationData"

//Importing components
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointments";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors";



//Refactored code to separate rendering from functionality:
export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview,
    updateSpotsRemaining
  } = useApplicationData();

  const interviewers = getInterviewersForDay(state, state.day)

  const appointments = getAppointmentsForDay(state, state.day);

  const schedule = appointments.map((appointment) => {
    return (
      <Appointment
        key={appointment.id}
        {...appointment}
        interview={getInterview(state, appointment.interview)}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
        updateSpotsRemaining={updateSpotsRemaining}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
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
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}