import { useState } from "react";


export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(mode, replace = false) {
    setMode(mode)
    setHistory((prevState) => {
      if (replace) {
        let resultArr = [...prevState]
        resultArr.splice(-1, 1, mode)
        return resultArr
      }
      else {
        return [...prevState, mode]
      }
    })
  }
  function back() {
    if (history.length !== 1) {
      setMode(history[history.length - 2])
      setHistory((prevHistory) => {
        return [...prevHistory.slice(0, -1)]
      })
    }
  }

  return { mode, transition, back };
};

function useCustomHook() {
  function action() { }

  return { action };
}