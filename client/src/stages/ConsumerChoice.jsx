/**
 * Filename: ConsumerChoice.jsx
 *
 *
 * Description: This file contains React components for displaying game instructions and managing consumer choices in the game interface.
 *
 * Components:
 * 1. Instruction: Component for displaying game instructions.
 * 2. ProductCard: Component for displaying producers' product cards.
 * 3. Choices: Component for managing consumer choices.
 * 4. ConsumerChoice: Main component for the consumer's choices.
 *
 * Author: Changxuan Fan
 * Date Crated: 3/14/2024
 */

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

import React, { useState, useEffect } from "react";
import { Button } from "../components/Button";
import { ToggleSwitch } from "../components/ToggleSwitch";
import {
  usePlayer,
  usePlayers,
  useGame,
  useRound,
} from "@empirica/core/player/classic/react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

import { ConfirmWindow } from "../components/ConfirmWindow";

// Fisher-Yates (aka Knuth) Shuffle Algorithm
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Component for displaying producers' product card
function ProductCard({
  advertisementQuality,
  warrant,
  brand,
  unitProduced,
  unitSelected,
  handleUnitSelected,
  confirmBuy,
  handleConfirmBuy,
}) {
  // Render a message if no units are produced
  if (unitProduced === 0) {
    return (
      <div
        className={`w-60 px-5 py-6 bg-gray-200 rounded-md flex flex-col items-center text-gray-600 text-center ${
          brand ? "h-113" : "h-106"
        }`}
      >
        <span className="text-xl font-bold">No Production</span>
        <span className="mt-2">
          One of the producers did not produce anything
        </span>
      </div>
    );
  }

  // Determine the image path based on advertisement quality
  const lowQualityImagePath = "./images/low_quality_apple.png";
  const highQualityImagePath = "./images/high_quality_apple.png";
  const imagePath =
    advertisementQuality === "low" ? lowQualityImagePath : highQualityImagePath;

  // Generate div elements for unit levels
  const unitLevels = [];
  for (let i = 0; i <= unitProduced; i++) {
    unitLevels.push(
      <div key={i} className="text-left">
        {i}
      </div>
    );
  }

  // Determine the slider width based on the range
  const sliderWidth = (() => {
    switch (unitProduced) {
      case 1:
        return 20;
      default:
        return 40;
    }
  })();

  return (
    <div
      className={`relative w-60 px-5 py-6 bg-gray-200 rounded-md duration-300 ${
        confirmBuy ? "scale-105 bg-gray-400" : ""
      } ${brand ? "h-113" : "h-106"}`}
    >
      {/* Render the warrant tag if warrant is larger than 0 */}
      {warrant > 0 && (
        <div className="absolute -top-4 left-0 bg-green-500 z-1 text-white w-60 px-5  ">
          <span>Prove-Me-Wrong Bond: ${warrant}</span>
        </div>
      )}

      {/* Product information */}
      <div className="text-center items-center flex flex-col">
        {brand && <h2 className="text-xl font-bold"> Brand: {brand}</h2>}
        <h2 className="text-2xl font-medium">
          {advertisementQuality === "low" ? "Low" : "High"} Quality
        </h2>
        <img
          src={imagePath}
          alt="Product"
          className="my-2 w-40 h-40 rounded-md cursor-pointer"
        />

        <h2 className="text-3xl">${advertisementQuality === "low" ? 4 : 10}</h2>
        <p>In Stock: {unitProduced}</p>
        <h2 className="text-xl">Select units: {unitSelected}</h2>

        {/* Slider for selecting unit quantity */}
        <div className={`w-${sliderWidth} flex flex-col  mb-1`}>
          <input
            type="range"
            min="0"
            max={unitProduced}
            step="1"
            value={unitSelected}
            onChange={handleUnitSelected}
            className="cursor-pointer"
          />
          <div className="flex flex-row text-sm justify-between">
            {unitLevels}
          </div>
        </div>

        {/* Toggle Switch */}
        <ToggleSwitch
          color={"green"}
          disabled={false}
          disabledWhenOff={true}
          checked={confirmBuy}
          onChange={handleConfirmBuy}
        />
      </div>
    </div>
  );
}

function Choices() {
  // Hook declarations
  const game = useGame();
  const round = useRound();
  const player = usePlayer();
  const players = usePlayers();

  // State for producers: products from all producers
  const [producers, setProducers] = useState({});
  const [confirmWindowEnabled, setConfirmWindowEnabled] = useState(false);

  // Variables
  const { accuracyNudgeEnabled, warrantEnabled, reputationSystemEnabled } =
    game.get("treatment");
  const roundName = round.get("name");

  // Effect to set all products' state from producers' data
  useEffect(() => {
    // producersMap will eventually be in setProducers()
    const producersMap = players.reduce((acc, player) => {
      if (player.get("role") === "producer") {
        const producerID = player.id;
        const producerData = {
          advertisementQuality: player.get(roundName)["advertisementQuality"],
          ...(reputationSystemEnabled && {
            // Spread operator with objects
            brand: player.get(roundName)["brand"],
          }),
          ...(warrantEnabled && { warrant: player.get(roundName)["warrant"] }),
          unitProduced: player.get(roundName)["unitProduced"],
          confirmBuy: false,
          unitSelected: 0,
        };
        acc[producerID] = producerData;
      }
      return acc; // acc is the dictionary: producers
    }, {}); // acc's initial value is {}

    // Shuffle the array of producers
    shuffleArray(producersMap);

    // Set all producers' products
    setProducers(producersMap);
  }, []);

  // Function to handle confirming to buy
  const handleConfirmBuy = (producerID) => {
    const producer = producers[producerID];

    // Ensure confirmBuy is true and unitSelected is not 0 before toggling
    if (producer["confirmBuy"] && producer["unitSelected"] !== 0) {
      setProducers((prevProducers) => ({
        ...prevProducers,
        [producerID]: {
          ...producer,
          unitSelected: 0,
          confirmBuy: !producer.confirmBuy,
        },
      }));
    }
  };

  // Function to handle unit Wanted
  // Automatically switch witch confirmBuy based on the selected value
  const handleUnitSelected = (producerID, e) => {
    const unitSelected = parseInt(e.target.value);
    const confirmBuy = unitSelected !== 0;

    // Update the unitSelected and confirmBuy of the selected producer
    setProducers((prevProducers) => ({
      ...prevProducers,
      [producerID]: {
        ...prevProducers[producerID],
        unitSelected: unitSelected,
        confirmBuy: confirmBuy,
      },
    }));
  };

  // Function to handle submission
  const handleSubmit = () => {
    // If consumer does not select any units, then simply submit
    const allUnitSelectedZero = Object.values(producers).every(
      (producer) => producer.unitSelected === 0
    );
    const roundName = round.get("name");
    const roundData = { producers: producers };

    if (allUnitSelectedZero || !accuracyNudgeEnabled || confirmWindowEnabled) {
      // Set player data and submit stage
      player.set(roundName, roundData);
      player.stage.set("submit", true);
    } else {
      // Enable confirm window
      setConfirmWindowEnabled(true);
    }
  };

  const totalRounds = game.get("totalRounds") || 5; // Example: Get total rounds from game state or set a fixed number

  // Dynamically build the list of round data
  const rounds = [];
  for(let i = 0; i <= totalRounds; i++) {
    const roundData = player.get(`Round ${i}`);
    if(roundData) { // Check if the round data exists
      rounds.push({
        ...roundData,
        roundName: `Round ${i}`,
      });
    }
  }
  console.log(player.get("Round 0"))

  const renderRoundsTable = () => {
    return (
      <table style={{ width: "100%" }}>
        <thead>
          <tr style = {{textAlign: 'center', padding: '0 5px', borderBottom: '2px solid black', fontSize: "12px"}}>
            <th>Round</th>
            <th>Ads Quality</th>
            <th>True Quality</th>
            <th>Units Bought</th>
            {reputationSystemEnabled && <th>Brand</th>}
            <th>Scores</th>
          </tr>
        </thead>
        <tbody>
        {rounds.flatMap((round, roundIndex) =>
          Object.entries(round.producers)
          .filter(([_, details]) => details.unitReceived > 0) 
          .map(([producerId, details], index) => (
            <tr key={`${roundIndex}-${producerId}-${index}`} style={{ textAlign: 'center', borderBottom: '2px solid black' }}>
              <td>{round.roundName}</td>
              <td>{details.advertisementQuality}</td>
              <td>{details.productQuality}</td>
              <td>{details.unitReceived}</td>
              {reputationSystemEnabled && <td>{details.brand}</td>}
              <td>{details.scoreChangeByProducer}</td>
            </tr>
          ))
        )}
      </tbody>
      </table>
    );
  };

  // JSX
  return (
    <div className="flex flex-row w-full p-4">
    <div
              style={{
                width: "61.8%",
                margin: "1%", // Spacing between the two containers
                overflow: "auto",
              }}
            >
      <div className="w-200 ml-20 mr-10 mb-8">
        <h1 className="text-xl text-gray-600 font-bold mb-1">Instruction</h1>
        <p className="text-gray-600 text-justify">
          In this stage, you will purchase the products with advertised quality.
        </p>
        <p className="text-gray-600 font-medium text-justify">
          Note: Your goal is to purchase product with maximum utilities.
        </p>
        <p className="text-gray-600 font-medium text-justify">
          If there is no prove-me-wrong bond, which means there is no bond.
        </p>
        <p className="text-gray-600 font-medium text-justify">
          Choose what product you want to purchase:
        </p>
      </div>

      
      <div className="flex flex-row  justify-around">
        {/* Display all prouducers' products */}
        {/* Use the Optional Chaining Operator (?.) */}
        {Object.entries(producers)?.map(([producerID, producer], index) => (
          <ProductCard
            key={producerID}
            advertisementQuality={producer.advertisementQuality}
            brand={producer.brand}
            warrant={producer.warrant}
            unitProduced={producer.unitProduced}
            unitSelected={producer.unitSelected}
            handleUnitSelected={(e) => handleUnitSelected(producerID, e)}
            confirmBuy={producer.confirmBuy}
            handleConfirmBuy={() => handleConfirmBuy(producerID)}
          />
        ))}
      </div>
      

      {/* Confirm Window */}
      <ConfirmWindow
        confirmWindowEnabled={confirmWindowEnabled}
        handleCancel={() => {
          setConfirmWindowEnabled(false);
        }}
        handleSubmit={handleSubmit}
      >
        Advertisers may sometime exaggerate claims in their advertisements.
      </ConfirmWindow>

      <div className="flex justify-center mt-5">
        <Button className="blue" handleClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
    <div style={{
      width: "38.2%", 
      display: "flex", 
      flexDirection: "column", 
      borderLeft: "2px solid #ccc", // Vertical line
      paddingLeft: "20px", // Spacing inside the right section
    }}>
        <div style={{ flex: "1", display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "center", }}>
        <img 
          src="./images/pay_off_matrix.png" 
          style={{ width: "50%", height: "auto" }} 
        />
      </div>

      {/* Table at the bottom */}
      <div style={{ flex: "1", display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
      <p style={{ textAlign: "center", fontWeight: "bold" }}>Choice History</p>
        {renderRoundsTable()}
      </div>
    </div>
    </div>
  );
}

// Component for displaying the leaderboard
// function LeaderBoard() {
//   const players = usePlayers();

//   // Assuming 'players' is an array of player objects with a 'get' method
//   const playerScores = players.map((player) => ({
//     score: player.get("score") || 0,
//     id: player.id || "Unknown", // Default to "Unknown" if id is not present
//   }));

//   // Sorting the scores in descending order
//   const sortedPlayers = playerScores.sort((a, b) => b.score - a.score);

//   // Generating the table content
//   const tableContent = sortedPlayers.map((player, index) => (
//     <tr key={index} className="border-b">
//       <td className="p-2">{player.id}</td>
//       <td className="p-2">{player.score}</td>
//     </tr>
//   ));

//   return (
//     <div className="max-w-lg mx-auto my-8 p-4 bg-white rounded-lg shadow-lg">
//       <h2 className="text-2xl font-semibold mb-4">Leaderboard</h2>
//       <table className="w-full">
//         <thead>
//           <tr>
//             <th className="py-2">Player</th>
//             <th className="py-2">Score</th>
//           </tr>
//         </thead>
//         <tbody>{tableContent}</tbody>
//       </table>
//     </div>
//   );
// }

// Main component for the consumer's choices
export function ConsumerChoice() {
  const player = usePlayer();

  // Submit for producer to enter waiting interface. (Not sure if useEffect is needed)
  if (player.get("role") === "producer") {
    player.stage.set("submit", true);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar showTimer={true} showRoundsStages={true} showScore={true} />
      <div className="flex-grow">
        <Choices />
      </div>
      <Footer />
      {/* <LeaderBoard /> */}
    </div>
  );
}
