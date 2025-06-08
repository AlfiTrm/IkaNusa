"use client"

import React, { useEffect, useState } from "react";

interface CountdownProps {
  endDate: string;
}

const calculateTimeLeft = (endDate: string) => {
  const difference = +new Date(endDate) - +new Date();
  let timeLeft = {
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  };

  if (difference > 0) {
    timeLeft = {
      days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(2, "0"),
      hours: String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, "0"),
      minutes: String(Math.floor((difference / 1000 / 60) % 60)).padStart(2, "0"),
      seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, "0"),
    };
  }

  return timeLeft;
};

const CountdownTimer = ({ endDate }: CountdownProps) => {
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(endDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(endDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  return (
    <div className="flex gap-2 text-xs text-center">
      <div>{timeLeft.days} <span className="block">Hari</span></div>
      <div>{timeLeft.hours} <span className="block">Jam</span></div>
      <div>{timeLeft.minutes} <span className="block">Menit</span></div>
      <div>{timeLeft.seconds} <span className="block">Detik</span></div>
    </div>
  );
};

export default CountdownTimer;
