import {
  usePlayer,
  usePlayers,
  useRound,
  useStage,
} from "@empirica/core/player/classic/react";
import { Loading } from "@empirica/core/player/react";
import React from "react";
import { Advertisements } from "./stages/Advertisements";
import { Result } from "./stages/Result";
import { Challenge } from "./stages/Challenge";


export function Stage() {
  const player = usePlayer();
  const players = usePlayers();
  const stage = useStage();

  if (player.stage.get("submit")) {
    if (players.length === 1) {
      return <Loading />;
    }

    return (
      <div className="text-center text-gray-400 pointer-events-none">
        Please wait for other player(s).
      </div>
    );
  }

  switch (stage.get("name")) {
    case "Advertisements":
      return <Advertisements />;
    case "challenge":
        return <Challenge />;
    case "result":
      return <Result />;
    default:
      return <Loading />;
  }
}
