import React, { useState } from 'react'
import InterviewerList from "components/InterviewerList"
import Button from "components/Button"

//This module will handle the form data when creating/editing an appointment
export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const reset = (evt) => { 
    setName("");
    setInterviewer(null);
    props.onCancel();
  }
  const save = (evt) => {
    if(name && interviewer) {
      props.onSave(name, interviewer);
      setName("");
     setInterviewer(null);
    }
  }


  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            value={name}
            onChange={evt => setName(evt.target.value)}
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
          />
        </form>
        <InterviewerList interviewers={props.interviewers} interviewer={interviewer} onChange={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={reset} danger>Cancel</Button>
          <Button onClick={save} confirm>Save</Button>
        </section>
      </section>
    </main>


  )
}