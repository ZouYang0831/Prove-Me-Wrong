/**
 * Filename: ProducerChoice.jsx

 * Description: 
 * This file contains components related to the producer's choices in the game.
 * Main Components include "Instruction, Choices, and LeaderBoard".
 * Component "Choices" include "BrandChoice, ProductionQualityChoice, AdvertisementQualityChoice, WarrantChoice, ProductImages"
 * 
 * Author: Changxuan Fan
 * Date Created : 3/12/2024
 *
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
}
*/

import React, { useState } from "react";
import { Button } from "../components/Button";
import {
  usePlayer,
  useGame,
  useRound,
} from "@empirica/core/player/classic/react";
import { ConfirmWindow } from "../components/ConfirmWindow";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

// Component for displaying game instructions

// Component for choosing a brand
function BrandChoice({ brand, onShow, randomBrands }) {
  return (
    <div className="mb-2">
      <div className="flex">
        <label className="font-medium">
          {/* Brand selection label */}
          Choose your brand name:
          <select
            id="brand"
            name="brand"
            value={brand}
            onChange={onShow}
            className="border border-gray-300 ml-2 text-sm rounded-md px-8 py-0.5"
          >
            <option disabled value="">
              Select
            </option>
            {randomBrands?.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option> /* key is required */
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}

// Component for choosing production quality
function ProductionQualityChoice({ setLow, setHigh }) {
  return (
    <div className="mb-1">
      <h2 className="font-medium mb-1">Choose what quality to produce:</h2>
      <div className="flex flex-row">
        <label>
          {/* Low quality production option */}
          <input
            type="radio"
            name="quality"
            value="Low Quality"
            className="ml-8 mr-3"
            onChange={setLow}
          />
          Produce Low Quality (Cost: $2)
        </label>
        <label>
          {/* High quality production option */}
          <input
            type="radio"
            name="quality"
            value="High Quality"
            className="ml-28.5 mr-3"
            onChange={setHigh}
          />
          Produce High Quality (Cost: $6)
        </label>
      </div>
    </div>
  );
}

// Component for choosing advertisement quality
function AdvertisementQualityChoice({ setLow, setHigh }) {
  return (
    <div className="mb-1">
      <h2 className="font-medium mb-1">
        {/* Advertisement quality label */}
        Choose how you want to advertise your product:
      </h2>
      <div className="flex flex-row">
        <label>
          {/* Low advertisement quality option */}
          <input
            type="radio"
            name="advertisement"
            value="Low Advertisement"
            className="ml-8 mr-3"
            onChange={setLow}
          />
          Advertise as Low Quality (Sell at $4)
        </label>
        <label>
          {/* High advertisement quality option */}
          <input
            type="radio"
            name="advertisement"
            value="High Advertisement"
            className="ml-20 mr-3"
            onChange={setHigh}
          />
          Advertise as High Quality (Sell at $10)
        </label>
      </div>
    </div>
  );
}

// Component for choosing unit produced
function UnitProducedChoice({ unitProduced, unitCap, onShow }) {
  // Determine the sliderWith based on the range
  const sliderWidth = (() => {
    switch (unitCap) {
      case 1:
        return "20";
      case 2:
      case 3:
        return "40";
      default:
        return "60";
    }
  })();

  // Generate div elements for unit levels
  const unitLevels = [];
  for (let i = 0; i <= unitCap; i++) {
    // range is number of elements - 1
    unitLevels.push(
      <div key={i} className="text-left">
        {i}
      </div>
    );
  }

  return (
    <div className="mb-1">
      <h2 className="mb-1">
        <span className="font-medium">
          How many units do you want to produce?
        </span>{" "}
        Your choice: {unitProduced}
      </h2>

      <div className={`w-${sliderWidth} mx-auto flex flex-col justify-center`}>
        <input
          type="range"
          min="0"
          max={unitCap}
          step="1"
          value={unitProduced}
          onChange={onShow}
          className="cursor-pointer"
        />
        <div className="flex flex-row text-sm justify-between">
          {unitLevels}
        </div>
      </div>
    </div>
  );
}

// Component for choosing warrant level
function WarrantChoice({ warrant, warrantCap, onShow }) {
  // Determine the sliderWith based on the range
  const sliderWidth = (() => {
    //! There is a bug of tailwind css. The width can only be w-20, w-40, and w-60. Others will be full width
    switch (warrantCap) {
      case 1:
        return "20";
      case 2:
      case 3:
        return "40";
      default:
        return "60";
    }
  })();

  // Generate div elements for warrant levels
  const warrantLevels = [];
  for (let i = 0; i <= warrantCap; i++) {
    // range is number of elements - 1
    warrantLevels.push(
      <div key={i} className="text-left">
        ${i}
      </div>
    );
  }

  return (
    <div className="mb-1">
      <h2 className="mb-1">
        <span className="font-medium">
          Warrant:
          <br />
          Are you willing to certify your quality claim is true?
        </span>
        {"                "}
        {warrant === 0 ? "No" : "$" + warrant} Prove-Me-Wrong Bond
      </h2>

      <div className={`w-${sliderWidth} mx-auto flex flex-col`}>
        <input
          type="range"
          min="0"
          max={warrantCap}
          step="1"
          value={warrant}
          onChange={onShow}
          className="cursor-pointer"
        />
        <div className="flex flex-row text-sm justify-between">
          {warrantLevels}
        </div>
      </div>
    </div>
  );
}

// Component for displaying product images
function ProductImages() {
  return (
    <div className="flex justify-center space-x-30">
      <figure>
        <img
          src="./images/low_quality_apple.png"
          alt="Low Quality Coffee"
          className="w-40 h-40"
        />
        <figcaption className="text-center text-sm text-black font-medium">
          Low Quality Coffee
        </figcaption>
      </figure>
      <figure>
        <img
          src="./images/high_quality_apple.png"
          alt="High Quality Coffee"
          className="w-40 h-40"
        />
        <figcaption className="text-center text-sm text-black font-medium">
          High Quality Coffee
        </figcaption>
      </figure>
    </div>
  );
}

// Component for handling player choices
function Choices() {
  const player = usePlayer();
  const game = useGame();
  const round = useRound();

  // Destructuring treatment options
  const {
    accuracyNudgeEnabled,
    reputationSystemEnabled,
    warrantEnabled,
    warrantCap,
    unitCap,
  } = game.get("treatment");

  // State variables
  const [brand, setBrand] = useState(""); // "a random brand name"
  const [productionQuality, setProductionQuality] = useState(""); // "low" or "high"
  const [advertisementQuality, setAdvertisementQuality] = useState(""); // "low" or "high"
  const [unitProduced, setUnitProduced] = useState(0); // 0 - unitCap
  const [warrant, setWarrant] = useState(0); // $0 - $warrantCap
  const [confirmWindowEnabled, setConfirmWindowEnabled] = useState(false);
  const [confirmWindowMessage, setConfirmWindowMessage] = useState("");
  const [allSelected, setAllSelected] = useState(true);

  const randomBrands = player.get("randomBrands");

  // Handle form submission
  const handleSubmit = () => {
    if (unitProduced === 0) {
      // If producer does not produce any units, submit it.
      const roundName = round.get("name");
      const roundData = {
        productQuality: "",
        advertisementQuality: "",
        unitProduced: 0,
        ...(reputationSystemEnabled && { brand: "" }),
        ...(warrantEnabled && { warrant: 0 }),
      };
      // Set player data and submit stage
      player.set(roundName, roundData);
      player.stage.set("submit", true);
    } else {
      // If the producer produces any units, check if all required inputs are selected
      let isAllSelected = productionQuality && advertisementQuality;
      isAllSelected = reputationSystemEnabled
        ? isAllSelected && brand
        : isAllSelected;

      // Set the state using a different variable to avoid async issues
      setAllSelected(isAllSelected);

      if (isAllSelected) {
        // Check if the player exaggerates or devalues the claim
        const confirmWindowMessage = getConfirmWindowMessage(
          productionQuality,
          advertisementQuality
        );
        if (
          accuracyNudgeEnabled &&
          !confirmWindowEnabled &&
          confirmWindowMessage
        ) {
          setConfirmWindowMessage(confirmWindowMessage);
          setConfirmWindowEnabled(true);
        } else {
          // Get the producer data for submitting
          const roundName = round.get("name");
          const roundData = {
            productQuality: productionQuality,
            advertisementQuality: advertisementQuality,
            unitProduced: unitProduced,
            ...(reputationSystemEnabled && { brand: brand }),
            ...(warrantEnabled && { warrant: warrant }),
          };
          // Set player data and submit stage
          player.set(roundName, roundData);
          player.stage.set("submit", true);
        }
      }
    }
  };

  // Function to get the confirm window message based on production and advertisement quality
  const getConfirmWindowMessage = (productionQuality, advertisementQuality) => {
    if (productionQuality === "low" && advertisementQuality === "high") {
      return "You choose to exaggerate the product quality in your advertisement.";
    } else if (productionQuality === "high" && advertisementQuality === "low") {
      return "You choose to devalue the product quality in your advertisement.";
    } else {
      return null;
    }
  };

  return (
    <div className="flex flex-row w-full p-4">
    <div
              style={{
                width: "61.8%",
                margin: "1%", // Spacing between the two containers
                overflow: "auto",
              }}
            >
      <div className="w-200 ml-20 mr-10 mb-4">
      {/* Title */}
      <h1 className="text-xl text-gray-600 font-bold">Instruction</h1>
      {/* Main Instruction */}
      <p className="text-gray-600 text-sm text-justify">
        In this stage, you will choose the quality of apple to produce and how
        you want to advertise it.
      </p>
      {/* Note */}
      <p className="text-gray-600 text-sm font-medium text-justify">
        Note: Your goal is to maximize your profit.
      </p>
    </div>


      {/* Brand Selection */}
      {reputationSystemEnabled && (
        <BrandChoice
          brand={brand}
          onShow={(e) => {
            setBrand(e.target.value);
          }}
          randomBrands={randomBrands}
        />
      )}

      {/* Production Quality */}
      <ProductionQualityChoice
        setLow={() => {
          setProductionQuality("low");
        }}
        setHigh={() => {
          setProductionQuality("high");
        }}
      />

      {/* Advertisement Quality */}
      <AdvertisementQualityChoice
        setLow={() => {
          setAdvertisementQuality("low");
        }}
        setHigh={() => {
          setAdvertisementQuality("high");
        }}
      />

      {/* UnitProduced */}

      <UnitProducedChoice
        unitProduced={unitProduced}
        unitCap={unitCap}
        onShow={(e) => {
          setUnitProduced(parseInt(e.target.value));
        }}
      />

      {/* Warrant */}
      {warrantEnabled && (
        <WarrantChoice
          warrant={warrant}
          warrantCap={warrantCap}
          onShow={(e) => {
            setWarrant(parseInt(e.target.value));
          }}
        />
      )}

      {/* Product images */}
      <ProductImages />

      {/* Confirm Window */}
      <ConfirmWindow
        confirmWindowEnabled={confirmWindowEnabled}
        handleCancel={() => {
          setConfirmWindowEnabled(false);
        }}
        handleSubmit={handleSubmit}
        children={confirmWindowMessage}
      ></ConfirmWindow>

      {/* Submit Button */}
      <div className="flex justify-center mt-5">
        <Button className="customGreen" handleClick={handleSubmit}>
          Submit
        </Button>
        {!allSelected && (
          <p className="text-red-600 ml-4 p-2">Please select all options!</p>
        )}
      </div>
    </div>
    <div style={{
      width: "38.2%", 
      display: "flex", 
      flexDirection: "column", 
      borderLeft: "2px solid #ccc", // Vertical line
      paddingLeft: "20px", // Spacing inside the right section
    }}>

      {/* Image at the top */}
      <div style={{ flex: "1", display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "center", }}>
        <img 
          src="./images/pay_off_matrix.png" 
          style={{ width: "50%", height: "auto" }} 
        />
      </div>

      {/* Table at the bottom */}
      <div style={{ flex: "1", display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
      <p style={{ textAlign: "center", fontWeight: "bold" }}>Choice History</p>
        <table style={{ width: "100%" }}>
          <thead>
            <tr style = {{textAlign: 'center', padding: '0 5px', borderBottom: '2px solid black', fontSize: "12px"}}>
              <th>Round</th>
              <th>Prod Quality</th>
              <th>Ads Quality</th>
              <th>Units Produced</th>
              <th>Units Sold</th>
              {reputationSystemEnabled && (
                                <>
                                    <th>Brand</th>
                                </>
                            )}
              <th>Scores</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ textAlign: 'center', borderBottom: '2px solid black' }}>
              <td>Data 1</td>
              <td>Data 2</td>
              <td>Data 3</td>
              <td>Data 1</td>
              <td>Data 2</td>
              <td>Data 3</td>
              <td>Data 3</td>
            </tr>
            <tr style={{ textAlign: 'center', borderBottom: '2px solid black' }}>
              <td>Data 1</td>
              <td>Data 2</td>
              <td>Data 3</td>
              <td>Data 1</td>
              <td>Data 2</td>
              <td>Data 3</td>
              <td>Data 3</td>
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>

    </div>

        </div>
      );
    }

// // Component for displaying the leaderboard
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

// Main component for the producer's choices
export function ProducerChoice() {
  const player = usePlayer();

  // Submit for Consumer to enter waiting interface. (Not sure if useEffect is needed)
  if (player.get("role") === "consumer") {
    player.stage.set("submit", true);
  }

  

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar showTimer={true} showRoundsStages={true} showScore={true} />
      <div className="flex-grow">
      
        <Choices />
      </div>
      <Footer />
    </div>
  );
}
