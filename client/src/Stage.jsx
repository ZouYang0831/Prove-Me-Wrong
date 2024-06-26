import {
  usePlayer,
  usePlayers,
  useRound,
  useStage,
} from "@empirica/core/player/classic/react";
import { Loading } from "@empirica/core/player/react";
import React from "react";
import { SelectRoles } from "./stages/SelectRoles";
import { WalkThrough } from "./stages/WalkThrough";
import { ConsumerChoice } from "./stages/ConsumerChoice";
import { ProducerChoice } from "./stages/ProducerChoice";

import { Navbar } from "./components/Navbar"; 
import { Footer } from "./components/Footer"; 
import { Feedback } from "./stages/Feedback";
import { Feedback2 } from "./stages/Feedback2";
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
      <>
        <Navbar stageTitle="Waiting Room" showRoundsStages = {false}  showScore = {false}/>
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center text-gray-400">
            Please wait for other player(s).
          </div>
        </div>
        <Footer />
      </>
    );
  }

  switch (stage.get("name")) {
    case "SelectRoles":
      return <SelectRoles />;
    case "WalkThrough":
      return <WalkThrough />;
    case "ConsumerChoice":
      return <ConsumerChoice />;
    case "ProducerChoice":
      return <ProducerChoice />;
    case "Feedback":
      return <Feedback />;
    case "Feedback2":
      return <Feedback2 />;
    case "FinalResult":
      return <FinalResult />
    default:
      return <Loading />;
  }
}
