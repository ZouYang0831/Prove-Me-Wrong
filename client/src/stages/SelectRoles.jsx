import React from "react";
import { usePlayer, useStage } from "@empirica/core/player/classic/react";
import { Button } from "../components/Button";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export function SelectRoles() {
  const player = usePlayer();
  const role = player.get("role");
  const stage = useStage();


  function handleSubmit() {
    player.stage.set("submit", true);
  }

  function ProducerInfo() {
    return <div>Producer specific content goes here.</div>;
  }

  function ConsumerInfo() {
    return <div>Consumer specific content goes here.</div>;
  }

  return (
    <div className="flex flex-col min-h-screen"> 
      <Navbar stageTitle="Welcome to Marketplace Game!" />
      <div className="flex-grow p-4">
        <p className="text-start my-4">
          You will play as a <b>{role}</b>!
        </p>
        {role === "consumer" ? <ConsumerInfo /> : <ProducerInfo />}
        <div className="flex justify-center mt-4">
          <Button primary={true} handleClick={handleSubmit}>I'm ready!</Button>
        </div>
      </div>
      <Footer /> 
    </div>
  );
}
