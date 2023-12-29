import dayjs from "dayjs";
import { useState, useEffect } from "react";

const formatAsTwoDigits = (value: number) => {
  return value.toString().padStart(2, "0");
};

export const useCountdown = (date: Date) => {
  const [time, setTime] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const timeout = setInterval(() => {
      const days = formatAsTwoDigits(dayjs(date).diff(Date.now(), "days"));
      const hours = formatAsTwoDigits(
        Math.max(0, dayjs(date).diff(Date.now(), "hours") % 24)
      );
      const minutes = formatAsTwoDigits(
        Math.max(0, dayjs(date).diff(Date.now(), "minutes") % 60)
      );
      const seconds = formatAsTwoDigits(
        Math.max(0, dayjs(date).diff(Date.now(), "seconds") % 60)
      );

      setTime({
        days,
        hours,
        minutes,
        seconds,
      });
    }, 1000);
    return () => clearInterval(timeout);
  }, [date]);

  return time;
};
