import React from "react";
import { usePlayer } from "@empirica/core/player/classic/react";
import { Button } from "../components/Button";

export function SelectRoles() {
  const player = usePlayer();

  function handleSubmit() {
    player.stage.set("submit", true);
  }

  function ProducerInfo() {
    return <div></div>; // Placeholder for producer information
  }

  function ConsumerInfo() {
    return <div></div>; // Placeholder for consumer information
  }

  const role = player.get("role");
  return (
    <div>
      <p>
        You will play as a <b>{role}</b>!
      </p>
      {role === "consumer" ? <ConsumerInfo /> : <ProducerInfo />}
      <Button primary={true} handleClick={handleSubmit}>I'm ready!</Button>
    </div>
  );
}
