import React, { useEffect, useState } from "react";

function Countdown({ expiryDate }) {
  const [timeText, setTimeText] = useState("");
  const [intervalId, setIntervalId] = useState();

  let milisecondsLeft;
  let secondsLeft;
  let minutesLeft;
  let hoursLeft;

  useEffect(() => {
    time();

    const intervalId = setInterval(() => {
      time();
    }, 1000);

    setIntervalId(intervalId);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  function time() {
    milisecondsLeft = expiryDate - Date.now();

    if (milisecondsLeft < 0) {
      setTimeText(null)
      clearInterval(intervalId);
      return null;
    }   

    secondsLeft = Math.floor((milisecondsLeft / 1000) % 100);
    minutesLeft = Math.floor((milisecondsLeft / 60000) % 60);
    hoursLeft = Math.floor(milisecondsLeft / 3600000);

    setTimeText(`${hoursLeft}h ${minutesLeft}m ${secondsLeft}s`);
  }

  return timeText ? <div className="de_countdown">{timeText}</div> : null;
}

export default Countdown;