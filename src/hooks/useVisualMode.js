//Setup for back buttons/changing visual modes in app
import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  console.log("mode before transition", mode)

  function transition(newMode, replace = false) {
    console.log("newMode", newMode)
    const newHistory = [...history];
    if(replace === true) {
      newHistory.pop();
    }

    setMode(newMode);
    setHistory([...newHistory, mode]);
  }
  
  function back() {
    if(history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();
      setHistory(newHistory);
      setMode(newHistory[newHistory.length - 1])
      console.log("Here's your mode: ", mode)
    };
  }

  return { mode, transition, back };
}
