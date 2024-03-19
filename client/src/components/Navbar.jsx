import React from "react";
import { Timer } from "../components/Timer";
import { useRound, useStage } from "@empirica/core/player/classic/react";

// Navbar Component
export function Navbar({ stageTitle, rightAction, onRightClick, showTimer = false, showRoundsStages = false }) {
  const round = useRound();
  const stage = useStage();

  return (
    <nav className="flex justify-between items-center py-10 bg-black text-white" style={{ height: '16%' }}>
      {/* Left Section */}
      <div className="flex-1">
        {showRoundsStages && (
          <div className="flex justify-start ml-8">
            <div className="text-left">
              <div className="text-3xl font-semibold">{round ? round.get("name") : ""}</div>
              <div className="text-2xl font-medium">{stage ? stage.get("name") : ""}</div>
            </div>
          </div>
        )}
      </div>

      {/* Center Section */}
      <div className="flex-1 flex justify-center items-center">
        {showTimer ? (
          <>
            <span className="text-4xl font-semibold mr-2">Time:</span>
            <Timer />
          </>
        ) : (
          <h1 className="text-4xl font-bold">{stageTitle}</h1>
        )}
      </div>

      {/* Right Section */}
      <div className="flex-1 flex justify-end">
        {rightAction && (
          <button onClick={onRightClick} className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded">
            {rightAction}
          </button>
        )}
      </div>
    </nav>
  );
}

