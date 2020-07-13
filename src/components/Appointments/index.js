import React from "react";
import Show from "components/Appointments/Show";
import "./styles.scss";
import Header from "components/Appointments/Header"
import Empty from "components/Appointments/Empty"
import Confirm from "components/Appointments/Confirm"
import Status from "components/Appointments/Status"
import useVisualMode from "hooks/useVisualMode"
import Form from "./Form";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";

export default function Appointment(props) {
  console.log("Cops, come and try to snatch my props ", props)
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  //TRANSITION NOT WORKING HELP. ALSO DOUBLE EMPTY SLOTS WHY
  //ALSO MY CANCEL BUTTON ON DELETE DOESN"T WORK WAS I SUPPOSED TO 
  //DO THAT YET? I HAVE NO IDEA. THIS IS STUPID.
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    console.log("saving?", mode)
    props.bookInterview(props.id, interview);
    transition(SHOW)
  }

  function deleteInterview(id) {
    transition(SAVING)
    console.log("Deleting?", mode)
    props.cancelInterview(id);
    transition(EMPTY)
  }

  //This is probably not the way to go but... just in case:
  // function edit(name, interviewer) {
  //   save(name, interviewer)
  // }

  return (
    <article className="appointment">

      <Header
        time={props.time}
      />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SAVING && <Status message="Saving" />}
      {mode === CONFIRM && <Confirm  message="Are you sure about that?" onConfirm={() => deleteInterview(props.id)} />}
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