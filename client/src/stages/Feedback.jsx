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
        const currentcapital = player.get("capital");
        //const unitSoldByConsumer = player.get("capital");
        const consumersInteracted = player.get(roundName)['consumers'];
        const numConsumersBought = Object.values(consumersInteracted).filter(details => details.unitSoldByConsumer > 0).length;
        console.log(numConsumersBought)

        let message, headlineColor;
        if (numConsumersBought === 0) {
            message = <span><strong>Unfortunately,</strong> no consumers bought your product.</span>;
            headlineColor = "red"; 
        } else if (numConsumersBought === 1) {
            message = <span><strong>Congratulations,</strong> 1 consumer bought your product!</span>;
            headlineColor = "#A4CC7C"; 
        } else {
            message = <span><strong>Congratulations,</strong> {numConsumersBought} consumers bought your product!</span>;
            headlineColor = "#A4CC7C"; 
        }
        console.log()
        return (
            
            <div className="flex flex-row w-full p-4">
            <div
              style={{
                width: "61.8%",
                height: "450px",
                backgroundColor: "#f0f0f0", // Light gray background
                borderRadius: "30px", // Rounded corners
                padding: "50px", // Inner spacing
                margin: "1%", // Spacing between the two containers
                overflow: "auto",
              }}
            >
              <p style={{ color: headlineColor, fontSize: "32px", fontWeight: "normal" }}>{message}</p>
              <div style={{ marginTop: "35px", fontSize: "20px" }}> {/* Adjust margin as needed */}
                    <p style={{ marginBottom: "13px" }}><b>This round:</b></p>
                    <p>Current Captital: {currentcapital}</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "45px" }}>
                    <table style={{ width: '70%', tableLayout: 'fixed' }}>
                        <thead>
                        <tr>
                            <th style={{ textAlign: 'center', padding: '0 5px', borderBottom: '2px solid black' }}>Prod Quality</th>
                            <th style={{ textAlign: 'center', padding: '0 5px', borderBottom: '2px solid black' }}>Ads Quality</th>
                            <th style={{ textAlign: 'center', padding: '0 5px', borderBottom: '2px solid black' }}>Units Produced</th>
                            <th style={{ textAlign: 'center', padding: '0 5px', borderBottom: '2px solid black' }}>Scores</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td style={{ textAlign: 'center', borderBottom: '2px solid black' }}>High</td>
                            <td style={{ textAlign: 'center', borderBottom: '2px solid black' }}>High</td>
                            <td style={{ textAlign: 'center', borderBottom: '2px solid black' }}>2</td>
                            <td style={{ textAlign: 'center', borderBottom: '2px solid black' }}>4</td>
                        </tr>
                        </tbody>
                    </table>
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", fontWeight: "bold", marginLeft: "30px", }}>
                        <span style={{fontSize: "1.4em", zIndex: 1,}}>Units sold:</span>
                        <span style={{ 
                            display: "inline-flex", 
                            alignItems: "center", 
                            justifyContent: "center", 
                            width: "20px", 
                            height: "20px", 
                            borderRadius: "50%", 
                            marginLeft: "30px", 
                            color: '#A4CC7C',
                            fontSize: "2em",
                            zIndex: 1,
                        }}>{currentcapital}</span>
                        <div style={{
                            clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
                            backgroundColor: "#D9D9D9",
                            position: "absolute",
                            width: "10%",
                            height: "13%",
                            zIndex: 0,
                            marginLeft: "80px",
                        }} />
                    </div>
                </div>
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