import {
  usePlayer,
  usePlayers,
  useRound,
  useStage,
} from "@empirica/core/player/classic/react";
import { Loading } from "@empirica/core/player/react";
import React from "react";
import { SelectRoles } from "./stages/SelectRoles";
import { ConsumerChoice } from "./stages/ConsumerChoice";
import { ProducerChoice } from "./stages/ProducerChoice";
// import { Feedback } from "./stages/Feedback";
// import { FinalResult } from "./stages/FinalResult";


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
    case "SelectRoles":
      return <SelectRoles />;
    case "ConsumerChoice":
      return <ConsumerChoice />;
    case "ProducerChoice":
      return <ProducerChoice />;
    case "Feedback":
      return <Feedback />;
    case "FinalResult":
      return <FinalResult />
    default:
      return <Loading />;
  }
}
