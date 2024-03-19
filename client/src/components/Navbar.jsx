import React from "react";
import { Timer } from "../components/Timer";
import { useRound, useStage, usePlayer } from "@empirica/core/player/classic/react";

// Navbar Component
export function Navbar({ stageTitle, showTimer = false, showRoundsStages = false, showScore = false }) {
  const player = usePlayer();
  const round = useRound();
  const stage = useStage();
  const score = player.get("score");

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
      {showScore && (
          <div className="text-right mr-8">
            <div className="text-3xl font-semibold">Score</div>
            <div className="text-2xl font-semibold">{score}</div>
          </div>
        )}
      </div>
    </nav>
  );
}

