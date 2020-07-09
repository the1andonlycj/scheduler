import React from "react";
import Show from "components/Appointments/Show";
import "./styles.scss";
import Header from "components/Appointments/Header"
import Empty from "components/Appointments/Empty"



//import ReactDOM from "react-dom";

//Should I be using "React.createElement"?
//Everything is imported. It has a return statement. It is taking in props.
//The <> tags are doing nothing.
//I do not know how to pass a time to the header <>


export default function Appointment(props) {
  console.log(props)
  return (
    <article className="appointment">
      
        <Header 
          time={props.time}
        />
        {props.interview ? 
        <Show
          id={props.id}
          interviewer={props.interview.interviewer.name}
          student={props.interview.student}
        /> 
        : 
        <Empty
        />}
      
    
    </article>

  )
}