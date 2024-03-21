import React from "react";
import { usePlayer, useStage } from "@empirica/core/player/classic/react";
import { Button } from "../components/Button";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export function Feedback() {
    const player = usePlayer();
    const role = player.get("role");
    const stage = useStage();
  
  
    function handleSubmit() {
      player.stage.set("submit", true);
    }
  
    function ProducerInfo() {
        return (
            <div className="flex flex-row w-full">
            <div
              style={{
                width: "61.8%",
                height: "400px",
                backgroundColor: "#f0f0f0", // Light gray background
                borderRadius: "40px", // Rounded corners
                padding: "20px", // Inner spacing
                marginRight: "2%", // Spacing between the two containers
                overflow: "auto",
              }}
            >
              <p>Producer specific content goes here.</p>
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
            <Button primary={true} handleClick={handleSubmit}>Proceed to next round</Button>
          </div>
        </div>
        <Footer /> 
      </div>
    );
  }