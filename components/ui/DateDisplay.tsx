"use client";

import { useState, useEffect } from "react";

const DateDisplay = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Update time every second
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const today = currentTime.toDateString();
  const time = currentTime.toLocaleTimeString();

  return (
    <span>
      {today} | {time}
    </span>
  );
};

export default DateDisplay;
