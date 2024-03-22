import React from "react";
import { usePlayer, useStage } from "@empirica/core/player/classic/react";
import { Button } from "../components/Button";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

/* 
consumerData: {
  consumerId: String,
  name: String,
  role: String,
  wallet: int,
  score: int,
  round1: {
    producers: {
      producerID: {
        productQuality: String,
        advertisementQuality: String,
        brand: String,
        warrant: int,
        unitProduced: int,
        unitSelected: int,
        unitReceived: int,
        confirmBuy: boolean,
        isChallenged: boolean,
        scoreChangeByProducer: int
      }
    },
    scoreChange: int
    choiceStartTime: Time,
    choiceEndTime: Time,
  }
}
 */

/* 
producerData: {
  id: String,
  name: String,
  role: String,
  capital: int,
  score: int,
  randomBrands: Array,
  round1: {
    productQuality: int,
    advertisementQuality: String,
    brand: String,
    warrant: int,
    unitProduced: int,
    unitSold: int,
    consumers: {
      consumerID: {
        unitSoldByConsumer: int,
        isChallenged: boolean
        scoreChangeByConsumer: int,
      }
    },
    unitLeft: int
    scoreUnitLeftDeducted: int,
    scoreChange: int,
    choiceStartTime: Time,
    choiceEndTime: Time,
  }
*/


export function Feedback() {
    const player = usePlayer();
    const role = player.get("role");
    const stage = useStage();
  
  
    function handleSubmit() {
      player.stage.set("submit", true);
    }
  
    function ProducerInfo() {
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
            <Button primary={true} handleClick={handleSubmit} style ={{backgroundColor:'#A4CC7C'}} >Proceed to next round</Button>
          </div>
        </div>
        <Footer /> 
      </div>
    );
  }