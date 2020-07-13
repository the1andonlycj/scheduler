import React from "react";
import Show from "components/Appointments/Show";
import "./styles.scss";
import Header from "components/Appointments/Header"
import Empty from "components/Appointments/Empty"
import Confirm from "components/Appointments/Confirm"
import Status from "components/Appointments/Status"
import Error from "components/Appointments/Error"
import useVisualMode from "hooks/useVisualMode"

import Form from "./Form";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  console.log("Cops, come and try to snatch my props ", props)
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(() => transition(ERROR_SAVE, true));
  }

  function deleteInterview(id) {
    transition(DELETING, true)
    props.cancelInterview(id)
    .then(() => transition(EMPTY))
    .catch(() => transition(ERROR_DELETE, true));
  }

  return (
    <article className="appointment">

      <Header
        time={props.time}
      />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRM && <Confirm  message="Are you sure about that?" onCancel={back} onConfirm={() => deleteInterview(props.id)} />}
      {mode === ERROR_DELETE && <Error message="Sorry, couldn't do a delete" onClose={back} />}
      {mode === ERROR_SAVE && <Error message="Sorry, couldn't do a save" onClose={back} />}
      {mode === EDIT && <Form name={props.interview.student} interviewer={props.interview.interviewer.id} interviewers={props.interviewers} onCancel={back} onSave={save} />}
      {mode === SHOW && props.interview && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={props.interviewers} onCancel={back} onSave={save} />
      )} 

    </article>

  )
}