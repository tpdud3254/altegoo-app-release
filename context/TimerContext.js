import React, { createContext, useState } from "react";

export const TimerContext = createContext({
  timerId: "",
  setTimerId: () => {},
});

const TimerProvider = ({ children }) => {
  const [timerId, setTimerId] = useState(false);

  const value = { timerId, setTimerId };

  return (
    <TimerContext.Provider value={value}>{children}</TimerContext.Provider>
  );
};

const TimerConsumer = TimerContext.Consumer;

export { TimerProvider, TimerConsumer };
export default TimerContext;
