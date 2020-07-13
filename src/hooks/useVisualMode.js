//Setup for back buttons/changing visual modes in app
import { React, useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  console.log("mode before transition", mode)

  function transition(newMode, replace = false) {
    console.log("newMode", newMode)
    if(replace === true) {
      history.pop();
    }

    setMode(newMode);
    setHistory([...history, newMode]);
    }
  
    function back() {
      if(history.length > 1) {
        history.pop();
        setMode(history[history.length - 1])
        console.log("Here's your mode: ", mode)
      };
    }
  return { mode, transition, back };
}
