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
        const producer = player.get(roundName)
        const prodQuality = producer['productQuality']
        const adsQuality = producer['advertisementQuality']
        const unitProduced = producer['unitProduced']
        const scoreChange = producer['scoreChange']
        let scorechangewithsign;
        if (scoreChange >= 0){
            scorechangewithsign = '+'+scoreChange
        }else{
            scorechangewithsign = scoreChange
        }
        const totalUnitsSold = Object.values(consumersInteracted).reduce((sum, consumer) => {
            return sum + (consumer.unitSoldByConsumer || 0); // Add the unitSoldByConsumer to the sum, defaulting to 0 if undefined
        }, 0);

        //console.log(consumersInteracted)
        //productQuality: int,
        //advertisementQuality

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
        //console.log(player.get('Round 0')['scoreChange'])

        const numProductsSold = Object.values(consumersInteracted).filter(details => details.unitSoldByConsumer > 0)
        //console.log(consumersInteracted)
        //console.log(totalUnitsSold)


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
                            <td style={{ textAlign: 'center', borderBottom: '2px solid black' }}>{prodQuality}</td>
                            <td style={{ textAlign: 'center', borderBottom: '2px solid black' }}>{adsQuality}</td>
                            <td style={{ textAlign: 'center', borderBottom: '2px solid black' }}>{unitProduced}</td>
                            <td style={{ textAlign: 'center', borderBottom: '2px solid black' }}>{scorechangewithsign}</td>
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
                        }}>{totalUnitsSold}</span>
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
            <div style={{ width: "36.2%", margin: "1%", flexDirection: "column"}}>
              {/* This is the right container, adjust as needed */}
              <p style={{textAlign: 'center', fontWeight: 'bold', fontSize: '24px', marginBottom: '20px', marginTop: '20px'}}>Producer Leaderboard</p>
              {renderTable(tableDataTop)}
              <p style={{textAlign: 'center', fontWeight: 'bold', fontSize: '24px', marginBottom: '20px', marginTop: '20px'}}>Consumer Leaderboard</p>
              {renderTable(tableDataBottom)}
            </div>
          </div>
        );
    }

    function renderTable(data) {
        return (
            <table style={{ width: "100%", marginBottom: "20px" }}>
                <thead>
                    <tr>
                        <th style={{ textAlign: 'center', padding: '0 5px', borderBottom: '2px solid black' }}>Rank</th>
                        <th style={{ textAlign: 'center', padding: '0 5px', borderBottom: '2px solid black' }}>Player's Name</th>
                        <th style={{ textAlign: 'center', padding: '0 5px', borderBottom: '2px solid black' }}>Scores</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index}>
                            <td style={{ textAlign: 'center', borderBottom: '2px solid black' }}>{row.rank}</td>
                            <td style={{ textAlign: 'center', borderBottom: '2px solid black' }}>{row.name}</td>
                            <td style={{ textAlign: 'center', borderBottom: '2px solid black' }}>{row.score}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }

    const tableDataTop = [
        { rank: 1, name: "Player 1", score: 100 },
        { rank: 2, name: "Player 2", score: 95 }
    ];

    const tableDataBottom = [
        { rank: 1, name: "Player 3", score: 90 },
        { rank: 2, name: "Player 4", score: 85 }
    ];
      
  
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