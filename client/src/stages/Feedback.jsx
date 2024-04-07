import React from "react";
import { usePlayer, useStage, usePlayers, useGame, useRound, } from "@empirica/core/player/classic/react";
import { Button } from "../components/Button";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { ToggleSwitch } from "../components/ToggleSwitch";
import { useState, useEffect } from "react";
import { Loading } from "@empirica/core/player/react";

  


export function Feedback() {
    const player = usePlayer();


  // Submit for Consumer to enter waiting interface. (Not sure if useEffect is needed)
    if (player.get("role") === "producer") {
        player.stage.set("submit", true);
    }

    const game = useGame();
    const role = player.get("role");
    const stage = useStage();
    const players = usePlayers();
    //players[1].set("score",players[1].get("score")+20)
    const round = useRound();
    const playerScores = players.map(player => ({
        id: player.id,
        name: player.get("name"),
        score: player.get("score")
    }));
    const consumerScores = playerScores.filter(player => player.name.includes("Consumer"));
    consumerScores.sort((a, b) => b.score - a.score);
    const producerScores = playerScores.filter(player => player.name.includes("Producer"));
    producerScores.sort((a, b) => b.score - a.score);
  
    function handleSubmit() {
        const roundName = round.get("name");
        const producersInteracted = player.get(roundName)['producers']; // Ensure this contains data
        const roundData = player.get(roundName) || {};
        roundData['challengeproducers'] = producersInteracted;
        player.set(roundName, roundData);
        player.stage.set("submit", true);
    }
  
    function ProducerInfo() {
        const roundName = round.get("name");
        const currentcapital = player.get("capital");
        const consumersInteracted = player.get(roundName)['consumers'];
        const numConsumersBought = Object.values(consumersInteracted).filter(details => details.unitSoldByConsumer > 0).length;
        const producer = player.get(roundName)
        const prodQuality = producer['productQuality']
        const adsQuality = producer['advertisementQuality']
        const unitProduced = producer['unitProduced']
        const scoreChange = producer['scoreChange']
        let scorechangewithsign;
        if (scoreChange > 0){
            scorechangewithsign = '+'+scoreChange
        }else{
            scorechangewithsign = scoreChange
        }
        const totalUnitsSold = Object.values(consumersInteracted).reduce((sum, consumer) => {
            return sum + (consumer.unitSoldByConsumer || 0); // Add the unitSoldByConsumer to the sum, defaulting to 0 if undefined
        }, 0);


        let message, headlineColor;
        if (numConsumersBought === 0) {
            message = <span><strong>Unfortunately,</strong> no consumers bought your product.</span>;
            headlineColor = "#E57C50"; 
        } else if (numConsumersBought === 1) {
            message = <span><strong>Congratulations,</strong> 1 consumer bought your product!</span>;
            headlineColor = "#A4CC7C"; 
        } else {
            message = <span><strong>Congratulations,</strong> {numConsumersBought} consumers bought your product!</span>;
            headlineColor = "#A4CC7C"; 
        }


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
                    <p>Current Captital: ${currentcapital}</p>
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
            console.log(producerScores[0].score),
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
        { rank: 1, name: producerScores[0].name, score: producerScores[0].score },
        { rank: 2, name: producerScores[1].name, score: producerScores[1].score }
    ];

    const tableDataBottom = [
        { rank: 1, name: consumerScores[0].name, score: consumerScores[0].score },
        { rank: 2, name: consumerScores[1].name, score: consumerScores[1].score }
    ];

    const {
        accuracyNudgeEnabled,
        reputationSystemEnabled,
        warrantEnabled,
        warrantCap,
        unitCap,
    } = game.get("treatment");
    

      
  
    function ConsumerInfo() {
        const roundName = round.get("name");
        const wallet = player.get("wallet");
        const producersInteracted = player.get(roundName)['producers'];
        const consumer = player.get(roundName)
        console.log("consumer", consumer)
        const scoreChange = consumer['scoreChange']
        const numCheatedByProducer = Object.values(producersInteracted).filter(details =>
            details.advertisementQuality === 'high' && details.productQuality === "low" && details.confirmBuy === true).length;
        
        const numProducersBoughtFrom = Object.values(producersInteracted).filter(details =>
            details.confirmBuy === true).length;

        let message, headlineColor;
        if (numCheatedByProducer === 0 && numProducersBoughtFrom === 0){
            message = <span>You did not purchase any products.</span>;
            headlineColor = "#E57C50"; 
        }else if (numCheatedByProducer === 0 && numProducersBoughtFrom > 0) {
            message = <span><strong>Congratulations,</strong> you did not get tricked!</span>;
            headlineColor = "#A4CC7C"; 
        } else if (numCheatedByProducer === 1) {
            message = <span><strong>Opps,</strong> you got tricked by 1 producer!</span>;
            headlineColor = "#E57C50"; 
        } else {
            message = <span><strong>Opps,</strong> you got tricked by {numCheatedByProducer} producers!</span>;
            headlineColor = "#E57C50"; 
        }

        const unitsBoughtFromProducer = Object.entries(producersInteracted)
        .filter(([_, details]) => details.unitReceived > 0)
        .map(([_, details]) => ({
            advertisementQuality: details.advertisementQuality,
            productQuality: details.productQuality,
            unitReceived: details.unitReceived,
            scoreChangeByProducer: details.scoreChangeByProducer, 
            isChallenged: details.isChallenged,
            producerid: details.producerid,
            warrant: details.warrant,
        }));
        

        const handleIsChallenge = (producerID) => {
            const currentProducers = consumer["producers"];
            const updatedProducers = { ...currentProducers };
            const warrant = updatedProducers[producerID].warrant
            const unitReceived = updatedProducers[producerID].unitReceived
            
            if (updatedProducers[producerID]) {
                updatedProducers[producerID].isChallenged = !updatedProducers[producerID].isChallenged;
                const scoreupdate = warrant*unitReceived;
                if (updatedProducers[producerID].isChallenged === false && updatedProducers[producerID].productQuality === 'low' && updatedProducers[producerID].advertisementQuality === 'high') {
                    updatedProducers[producerID].scoreChangeByProducer = updatedProducers[producerID].scoreChangeByProducer - scoreupdate;
                    player.set("score", player.get("score") - scoreupdate);
                    player.set("wallet", player.get("wallet") - scoreupdate);
                    for (let i = 0; i < players.length; i++) {
                        const checkproducer = players[i];
                        if (checkproducer.id === producerID){
                        checkproducer.set("score",checkproducer.get("score") + scoreupdate)}
                    }


                } else if (updatedProducers[producerID].isChallenged === true && updatedProducers[producerID].productQuality === 'low' && updatedProducers[producerID].advertisementQuality === 'high'){
                    updatedProducers[producerID].scoreChangeByProducer = updatedProducers[producerID].scoreChangeByProducer + scoreupdate;
                    player.set("score", player.get("score") + scoreupdate);
                    player.set("wallet", player.get("wallet") + scoreupdate);
                    //player.set("scoreChallenge", -scoreupdate);
                    for (let i = 0; i < players.length; i++) {
                        const checkproducer = players[i];
                        if (checkproducer.id === producerID){
                        checkproducer.set("score",checkproducer.get("score") - scoreupdate)}
                    }
                }
                
                
                player.set("producers", updatedProducers);
                
            }
        };   


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
                    <p>Current Wallet: ${wallet}</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "45px" }}>
                    <table style={{ width: '90%', tableLayout: 'fixed' }}>
                        <thead>
                        <tr>
                            <th style={{ textAlign: 'center', padding: '0 5px', borderBottom: '2px solid black' }}>Ads Quality</th>
                            <th style={{ textAlign: 'center', padding: '0 5px', borderBottom: '2px solid black' }}>True Quality</th>
                            <th style={{ textAlign: 'center', padding: '0 5px', borderBottom: '2px solid black' }}>Units Bought</th>
                            {warrantEnabled && (
                                <>
                                    <th style={{ textAlign: 'center', padding: '0 5px', borderBottom: '2px solid black' }}>Warrant</th>
                                    <th style={{ textAlign: 'center', padding: '0 5px', borderBottom: '2px solid black' }}>Challenge</th>
                                </>
                            )}
                            <th style={{ textAlign: 'center', padding: '0 5px', borderBottom: '2px solid black' }}>Scores</th>
                        </tr>
                        </thead>
                        <tbody>
                        {unitsBoughtFromProducer.map((detail, index) => (
                            <tr key={index}>
                                <td style={{ textAlign: 'center', borderBottom: '2px solid black' }}>{detail.advertisementQuality}</td>
                                <td style={{ textAlign: 'center', borderBottom: '2px solid black' }}>{detail.productQuality}</td>
                                <td style={{ textAlign: 'center', borderBottom: '2px solid black' }}>{detail.unitReceived}</td>
                                {warrantEnabled && (
                                    <>
                                        <td style={{ textAlign: 'center', borderBottom: '2px solid black' }}>{detail.warrant}</td>
                                        <td style={{ textAlign: 'center', borderBottom: '2px solid black', position: 'relative', left: '4%' }}>
                                        
                                        <ToggleSwitch
                                            color={"orange"}
                                            disabled={false}
                                            disabledWhenOff={false}
                                            checked={detail.isChallenged}
                                            onChange={() => handleIsChallenge(detail.producerid)}
                                        />
                                        </td>
                                    </>
                                )}
                                <td style={{ textAlign: 'center', borderBottom: '2px solid black' }}>
                                    {detail.scoreChangeByProducer > 0 ? `+${detail.scoreChangeByProducer}` : detail.scoreChangeByProducer}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                
            </div>
            <div style={{ width: "36.2%", margin: "1%", flexDirection: "column"}}>
               <p style={{textAlign: 'center', fontWeight: 'bold', fontSize: '24px', marginBottom: '20px', marginTop: '20px'}}>Producer Leaderboard</p>
               {renderTable(tableDataTop)}
               <p style={{textAlign: 'center', fontWeight: 'bold', fontSize: '24px', marginBottom: '20px', marginTop: '20px'}}>Consumer Leaderboard</p>
               {renderTable(tableDataBottom)}
             </div>
            </div>
        );

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