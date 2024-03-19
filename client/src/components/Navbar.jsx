import React from "react";
import { Timer } from "../components/Timer";

// Navbar Component
export function Navbar({ stageTitle, leftAction, rightAction, onLeftClick, onRightClick }) {
  return (
    <nav className="flex justify-between items-center py-10 bg-black text-white">
      <div className="flex justify-start">
        {leftAction && (
          <button onClick={onLeftClick} className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded">
            {leftAction}
          </button>
        )}
      </div>

      <h1 className="text-center flex-1 text-4xl font-bold">{stageTitle}</h1>

      <Timer />

      <div className="flex justify-end">
        {rightAction && (
          <button onClick={onRightClick} className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded">
            {rightAction}
          </button>
        )}
      </div>
    </nav>
  );
}

