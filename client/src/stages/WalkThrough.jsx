import React from "react";
import { usePlayer, useStage } from "@empirica/core/player/classic/react";
import { Button } from "../components/Button";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import {
    usePlayers,
    useGame,
    useRound,
  } from "@empirica/core/player/classic/react";

export function WalkThrough() {
    const player = usePlayer();
    const role = player.get("role");
    const stage = useStage();
    const game = useGame();
    const baselineConsumer = "./images/walkthrough_consumer.png"
    const baselineProducer = "./images/walkthrough_producer.png"
    const RSProducer = "./images/RSProducer.png"
    const RSConsumer = "./images/RSConsumer.png"
    const warrantConsumer = "./images/warrantConsumer.png"
    const warrantProducer = "./images/warrantProducer.png"

    const {
        accuracyNudgeEnabled,
        reputationSystemEnabled,
        warrantEnabled,
    } = game.get("treatment");

    let pathConsumer, pathProducer;
    if (reputationSystemEnabled) {
        pathConsumer = RSConsumer
        pathProducer = RSProducer
    } else if (warrantEnabled) {
        pathConsumer = warrantConsumer 
        pathProducer = warrantProducer
    } else {
        pathConsumer = baselineConsumer 
        pathProducer = baselineProducer
    }


    function handleSubmit() {
        player.stage.set("submit", true);
    }

    function ProducerInfo() {
        return (
            <div 
              style={{
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '65vh' // This makes the div take the full viewport height
              }}
            >
              <img
                src={pathProducer}
                alt="Product"
                style={{
                  maxHeight: '100%', // Make image full height of its container
                  maxWidth: '100%', // Ensure it also respects the width limit
                  objectFit: 'contain' // This ensures the aspect ratio is maintained without cropping
                }}
              />
            </div>
        );
    }

    function ConsumerInfo() {
        return (
            <div 
              style={{
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '65vh' // This makes the div take the full viewport height
              }}
            >
              <img
                src={pathConsumer}
                alt="Product"
                style={{
                  maxHeight: '100%', // Make image full height of its container
                  maxWidth: '100%', // Ensure it also respects the width limit
                  objectFit: 'contain' // This ensures the aspect ratio is maintained without cropping
                }}
              />
            </div>
        );
    }


    return (
        <div className="flex flex-col min-h-screen"> 
        <Navbar stageTitle="Welcome to Marketplace Game!" />
        <div className="flex-grow p-4">
            {role === "consumer" ? <ConsumerInfo /> : <ProducerInfo />}
            <div className="flex justify-center mt-4">
            <Button primary={true} handleClick={handleSubmit}>START!</Button>
            </div>
        </div>
        <Footer /> 
        </div>
    );
}