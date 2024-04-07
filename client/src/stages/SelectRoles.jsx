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
    return <div style={{ fontSize: '20px' }}>
      <p>
      Dive into the world of the Marketplace Game! As a producer, your quest is to skyrocket your profits and climb the leader board to glory. Each decision you make—opting for either LOW or HIGH quality in production and how you choose to market your product—will be pivotal in your journey to success.
      </p><br/>
      <p>
      You will start with $100 in venture capital and prepare for a competition against another producer, all vying for the wallet of two consumers. 
      </p><br/>
      <p>
      🚀 Are you ready to rise to the occasion and claim your title as the ultimate producer?
      </p><br/>
    </div>;
  }

  function ConsumerInfo() {
    return <div style={{ fontSize: '20px' }}>
      <p>
      Step into the dynamic Marketplace Game, where your decision-making skills are your greatest asset! As a consumer, your mission is to make wise purchases based on the advertisements from two competing producers.
      </p><br/>
      <p>
      You will start with budget of $150. Remember, the real quality of each product will be revealed once you make purchase(s). Can you see through the marketing and find the true value?
      </p><br/>
      <p>
      🌟 Are you prepared to embark on this quest and emerge as the ultimate Smart Consumer? 🌟
      </p><br/>
    </div>;
  }

  return (
    <div className="flex flex-col min-h-screen"> 
      <Navbar stageTitle="Welcome to Marketplace Game!" />
      <div className="flex-grow p-4" style={{ fontSize: '30px' }}>
        <p className="text-start my-4">
        🌟 Welcome, <b>{role}</b>! 🌟
        </p><br/>
        {role === "consumer" ? <ConsumerInfo /> : <ProducerInfo />}
        <div className="flex justify-center mt-4">
          <Button primary={true} handleClick={handleSubmit}>I'm ready!</Button>
        </div>
      </div>
      <Footer /> 
    </div>
  );
}
