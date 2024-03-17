import React from "react";
import { useStageTimer } from "@empirica/core/player/classic/react";

export function Timer() {
  // Get timer data from the stage
  const timer = useStageTimer();

  // Calculate remaining time in seconds
  let remaining;
  if (timer?.remaining || timer?.remaining === 0) {
    remaining = Math.round(timer?.remaining / 1000);
  }

  // Render the timer component
  return (
    <div className="flex flex-col items-center">
      <h1 className="tabular-nums text-3xl text-gray-500 font-semibold">
        {formatTime(remaining)}
      </h1>
    </div>
  );
}

// Format time into human-readable format (hh:mm:ss)
function formatTime(seconds) {
  // If seconds are not provided, display placeholders
  if (seconds === null || seconds === undefined) {
    return "--:--";
  }

  let formattedTime = "";

  // Calculate seconds
  const sec = seconds % 60;
  formattedTime += sec < 10 ? "0" + sec : sec;

  // Calculate minutes
  const min = (seconds - sec) / 60;
  if (min === 0) {
    return `00:${formattedTime}`;
  }
  formattedTime = `${(min % 60 < 10 ? "0" : "") + (min % 60)}:${formattedTime}`;

  // Calculate hours
  const hours = (min - (min % 60)) / 60;
  if (hours === 0) {
    return formattedTime;
  }

  return `${(hours < 10 ? "0" : "") + hours}:${formattedTime}`;
}
