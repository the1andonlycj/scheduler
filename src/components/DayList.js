import React from "react";
import DayListItem from "./DayListItem.js"




export default function DayList(props) {
  const dayData = props.days.map(day => {
    return (
      <DayListItem 
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.day}
        setDay={event => props.setDay(day.name)}
      />

    );
  });

  return dayData;
}