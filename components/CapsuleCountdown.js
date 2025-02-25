"use client";

import { useState, useEffect } from "react";
import { StopwatchIcon } from "./Icons/StopwatchIcon";
import { toast } from "sonner";
import { unlockCapsule } from "@/lib/actions/capsule.actions";
import { SpinnerIcon } from "./Icons/Spinner";
import confetti from "canvas-confetti";

export default function CapsuleCountdown({ openingDate, capsuleId }) {
  const [timeLeft, setTimeLeft] = useState([0, 0, 0, 0, 0, 0]);
  const [unlocking, setUnlocking] = useState(false);

  useEffect(() => {
    if (!openingDate || openingDate.getTime() <= Date.now()) return;

    const getTimeLeft = (targetDate) => {
      const now = new Date();

      if (targetDate <= now) return [0, 0, 0, 0, 0, 0];

      let years = targetDate.getFullYear() - now.getFullYear();
      let months = targetDate.getMonth() - now.getMonth();
      let days = targetDate.getDate() - now.getDate();
      let hours = targetDate.getHours() - now.getHours();
      let minutes = targetDate.getMinutes() - now.getMinutes();
      let seconds = targetDate.getSeconds() - now.getSeconds();

      // Adjust for negative values
      if (seconds < 0) {
        seconds += 60;  // Add 60 seconds
        minutes--;      // Borrow 1 minute
      }
      if (minutes < 0) {
        minutes += 60;  // Add 60 minutes
        hours--;        // Borrow 1 hour
      }
      if (hours < 0) {
        hours += 24;    // Add 24 hours
        days--;         // Borrow 1 day
      }
      if (days < 0) {
        const previousMonth = new Date(now.getFullYear(), now.getMonth(), 0);  
        days += previousMonth.getDate();  // Add days from previous month
        months--;                          // Borrow 1 month
      }
      if (months < 0) {
        months += 12;  // Add 12 months
        years--;       // Borrow 1 year
      }

      return [years, months, days, hours, minutes, seconds];
    };

    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(openingDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [openingDate]);

  const paddedTimeLeft = timeLeft.map((unit) => unit.toString().padStart(2, "0"));

  if (openingDate?.getTime() <= Date.now()) {
    return (
      <button
        className="px-3 py-2 text-base hover:bg-orange-800 ease-in duration-300 bg-orange-900 text-stone-50 max-w-max self-end"
        onClick={async () => {
          setUnlocking(true);
          await unlockCapsule(capsuleId);
          confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
          toast.success("Capsule unlocked!");
          setUnlocking(false);
        }}
      >
        {unlocking && <SpinnerIcon className="w-5 h-5 mr-1 inline-block" />}
        {unlocking ? "Unlocking..." : "Unlock capsule"}
      </button>
    );
  }

  return (
    <p
      className="px-3 py-2 text-base bg-orange-900 self-end text-stone-50 max-w-max flex gap-2 items-center justify-center"
      aria-label="Time left until capsule opens"
      title="yr : mo : d : hr : min : sec"
    >
      <StopwatchIcon className="w-5 h-5 mr-1" />
      {paddedTimeLeft.join(" : ")}
    </p>
  );
}
