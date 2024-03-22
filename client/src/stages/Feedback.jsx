import React from "react";
import { usePlayer, useStage, usePlayers, useGame, useRound, } from "@empirica/core/player/classic/react";
import { Button } from "../components/Button";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
  


export function Feedback() {
    const player = usePlayer();
    const role = player.get("role");
    const stage = useStage();
    const players = usePlayers();
    const round = useRound();
    

    
  
    function handleSubmit() {
      player.stage.set("submit", true);
    }
  
    function ProducerInfo() {
        const roundName = round.get("name");
    const consumersInteracted = player.get(roundName)['consumers'];
    const numConsumersBought = Object.values(consumersInteracted).filter(details => details.unitSoldByConsumer > 0).length;
        console.log(numConsumersBought)
        return (
            
            <div className="flex flex-row w-full p-4">
            <div
              style={{
                width: "61.8%",
                height: "450px",
                backgroundColor: "#f0f0f0", // Light gray background
                borderRadius: "30px", // Rounded corners
                padding: "30px", // Inner spacing
                margin: "1%", // Spacing between the two containers
                overflow: "auto",
              }}
            >
              <p>Producer specific content goes here.{numConsumersBought}</p>
              <p>Producer specific content goes here.</p>
              <p>Producer specific content goes here.</p>
            </div>
            <div style={{ width: "36.2%" }}>
              {/* This is the right container, adjust as needed */}
              <p>Other content goes here.</p>
            </div>
          </div>
        );
    }
      
  
    function ConsumerInfo() {
      return <div>Consumer specific content goes here.</div>;
    }
  
    return (
      <div className="flex flex-col min-h-screen"> 
        <Navbar showTimer={true} showRoundsStages={true} showScore={true}/>
        <div className="flex-grow p-4">
          {role === "consumer" ? <ConsumerInfo /> : <ProducerInfo />}
          <div className="flex justify-center mt-4">
            <Button primary={true} handleClick={handleSubmit} style ={{backgroundColor:'#A4CC7C'}} >Proceed to next round</Button>
          </div>
        </div>
        <Footer /> 
      </div>
    );
  }