import React from "react";
import "styles/DayListItem.scss";
const classnames = require('classnames');

export default function DayListItem(props) {
  const dayClass = classnames("dayClass", {
    "day-list__item": true,
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots===0
  })

  return (
    <li className={dayClass} onClick={props.setDay}>
      <h2 className="text--regular">{props.name}</h2>
        {props.spots===0 
        && <h3>no spots remaining</h3>
        }
        {props.spots===1
          && <h3>1 spot remaining</h3>
        }
        {props.spots > 1
          && <h3>{props.spots} spots remaining</h3>
        }
    </li>
  );
}
