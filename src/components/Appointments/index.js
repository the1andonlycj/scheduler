import React from "react";
import Show from "components/Appointments/Show";
import "./styles.scss";
import Header from "components/Appointments/Header"
import Empty from "components/Appointments/Empty"
import useVisualMode from "hooks/useVisualMode"
import Form from "./Form";


//import ReactDOM from "react-dom";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  return (
    <article className="appointment">

      <Header
        time={props.time}
      />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)}/>}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={[]} onCancel={back}/>
      )}

    </article>

  )
}