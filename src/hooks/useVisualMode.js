//Setup for back buttons/changing visual modes in app
import { React, useState } from "react";

export function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
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
