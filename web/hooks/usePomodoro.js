import { useEffect, useRef, useState } from "react";

const pomodoroTypes = {
  pomodoro: 1500,
  shortBreak: 300,
  longBreak: 900,
};

export const usePomodoro = () => {
  const [pomodoroType, setPomodoroType] = useState("pomodoro");
  const [timerStatus, setTimerStatus] = useState("idle");
  const [timer, setTimer] = useState(pomodoroTypes["pomodoro"]);
  const [pomodoroIntervalCount, setPomodoroIntervalCount] = useState(1);
  const [longBreakIntervalCount, setLongBreakIntervalCount] = useState(4);
  const audioRef = useRef(null);

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  const nextPomodoroType = () => {
    if (pomodoroType === "pomodoro") {
      return pomodoroIntervalCount % longBreakIntervalCount === 0
        ? "longBreak"
        : "shortBreak";
    }
    return "pomodoro";
  };

  const handleNextPomodoroType = () => {
    const newPomodorotype = nextPomodoroType();

    newPomodorotype === "pomodoro" &&
      setPomodoroIntervalCount((prev) => prev + 1);

    setTimerStatus("idle");
    setTimer(pomodoroTypes[newPomodorotype]);
    setPomodoroType(newPomodorotype);
  };

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/audios/egg-timer-ding.mp3");
    }
    let interval;
    const clearTimerInterval = () => clearInterval(interval);

    if (timerStatus === "running" && timer > 0) {
      interval = setInterval(() => {
        let newTimer;
        setTimer((t) => {
          newTimer = t - 1;
          return newTimer;
        });
        if (newTimer === 0) {
          document.getElementById("ring-audio-button")?.click();
          handleNextPomodoroType();
        }
      }, 1000);
    }
    return clearTimerInterval;
  }, [timerStatus]);

  const timerString = `${minutes < 10 ? "0" + minutes : minutes}:${
    seconds < 10 ? "0" + seconds : seconds
  }`;

  return {
    handleNextPomodoroType,
    timerString,
    pomodoroTypes,
    setPomodoroType,
    pomodoroType,
    setTimerStatus,
    timerStatus,
    pomodoroIntervalCount,
    handleNextPomodoroType,
    setTimer,
  };
};
