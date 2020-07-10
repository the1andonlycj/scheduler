import React from "react";
import DayListItem from "./DayListItem.js"


//setState is not defined... anywhere...? But I'm not sure
//how to define it or where exactly I should do it.

export default function DayList(props) {
  const dayData = props.days.map(day => {
    return (
      <DayListItem 
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.day}
        setDay={props.setDay}
      />

    );
  });

  return dayData;
}

