/*
 * Filename: ProducerChoice.jsx
 * Description: This file contains components related to the producer's choices in the game.
 * Main Components include Instruction, Choices, and LeaderBoard.
 * Component Choices BrandChoice, ProductionQualityChoice, AdvertisementQualityChoice, WarrantChoice, ProductImages
 * Author: Changxuan Fan
 * Date: 3/12/2024
 */

import React, { useState } from "react";
import { Button } from "../components/Button";
import {
  usePlayer,
  usePlayers,
  useGame,
} from "@empirica/core/player/classic/react";

// Component for displaying game instructions
function Instruction() {
  return (
    <div className="w-200 ml-20 mr-10 mb-8">
      {/* Title */}
      <h1 className="text-xl text-gray-600 font-bold mb-1">Instruction</h1>
      {/* Main Instruction */}
      <p className="text-gray-600 text-justify">
        In this stage, you will choose the quality of toothpaste to produce and
        how you want to advertise it.
      </p>
      {/* Note */}
      <p className="text-gray-600 font-bold text-justify">
        Note: Your goal is to maximize your profit.
      </p>
    </div>
  );
}

// Component for choosing a brand
function BrandChoice({ brand, onShow }) {
  return (
    <div className="mb-2">
      <div className="flex">
        <label className="font-bold">
          {/* Brand selection label */}
          Choose your brand name:
          <select
            id="brand"
            name="brand"
            value={brand}
            onChange={onShow}
            className="border border-gray-300 ml-2 mb-2 rounded-md px-8 py-1"
          >
            <option value="">Select</option>
            <option value="a">Option A</option>
            <option value="b">Option B</option>
            <option value="c">Option C</option>
          </select>
        </label>
      </div>
    </div>
  );
}

// Component for choosing production quality
function ProductionQualityChoice({ setLow, setHigh }) {
  return (
    <div className="mb-2">
      <h2 className="font-bold mb-2">Choose what quality to produce:</h2>
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
    <div className="mb-2">
      <h2 className="font-bold mb-2">
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

// Component for choosing warrant level
function WarrantChoice({ warrant, onShow }) {
  return (
    <div className="mb-2">
      <h2 className="font-bold mb-2">
        {/* Warranty level label */}
        How much do you want to warrant your ads claim?
      </h2>
      <div className="w-64 mx-auto">
        <input
          type="range"
          min="0"
          max="4"
          step="1"
          value={warrant}
          onChange={onShow}
          className="w-full"
        />
        <div className="flex">
          <div className="w-1/4">0</div>
          <div className="w-1/4">1</div>
          <div className="w-1/4">2</div>
          <div className="w-1/4">3</div>
          <div>4</div>
        </div>
        <div className="text-center">Your choice: {warrant}</div>
      </div>
    </div>
  );
}

// Component for displaying product images
function ProductImages() {
  return (
    <div className="flex items-center space-x-8">
      <figure>
        <img
          src="./images/toothpastestandard.jpg"
          alt="Standard Toothpaste"
          className="w-60 ml-20 mr-20"
        />
        <figcaption className="text-center text-base text-black font-bold">
          Low Quality Toothpaste
        </figcaption>
      </figure>
      <figure>
        <img
          src="./images/toothpasteamazing.jpg"
          alt="Amazing Toothpaste"
          className="w-60"
        />
        <figcaption className="text-center text-base text-black font-bold">
          High Quality Toothpaste
        </figcaption>
      </figure>
    </div>
  );
}

// Component for handling player choices
function Choices() {
  const player = usePlayer();
  const game = useGame();

  const treatment = game.get("treatment");
  const { accuracyNudgeEnabled, reputationSystemEnabled, warrantEnabled } =
    treatment;

  const [brand, setBrand] = useState("");
  const [productionQuality, setProductionQuality] = useState("");
  const [advertisementQuality, setAdvertisementQuality] = useState("");
  const [warrant, setWarrant] = useState(0);

  // Handle form submission
  const handleSubmit = () => {
    // Check if all radio inputs are selected
    let allSelected = productionQuality && advertisementQuality;

    if (reputationSystemEnabled) {
      // Check if brand is selected if reputation system is enabled
      allSelected = allSelected && brand;
    } else if (warrantEnabled) {
      // Check if warrant is selected if warrant system is enabled
      allSelected = allSelected && warrant;
    }

    if (allSelected) {
      player.stage.set("submit", true);
    } else {
      alert("Not all questions are answered.");
    }
  };

  return (
    <div className="w-200 ml-20 mr-10 mb-10">
      {/* Brand Selection */}
      {reputationSystemEnabled && (
        <BrandChoice
          brand={brand}
          onShow={(e) => {
            setBrand(e.target.value);
          }}
        />
      )}

      {/* Production Quality */}
      <ProductionQualityChoice
        setLow={() => {
          setProductionQuality("low");
        }}
        setHigh={() => {
          setAdvertisementQuality("high");
        }}
      />

      {/* Advertisement Quality */}
      <AdvertisementQualityChoice
        setLow={() => {
          setProductionQuality("low");
        }}
        setHigh={() => {
          setAdvertisementQuality("high");
        }}
      />

      {/* Warrant */}
      {warrantEnabled && (
        <WarrantChoice
          warrant={warrant}
          onShow={(e) => {
            setWarrant(parseInt(e.target.value));
          }}
        />
      )}

      {/* Product images */}
      <ProductImages />

      {/* Submit Button */}
      <div className="flex justify-center mt-5">
        <Button type="submit" handleClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
}

// Component for displaying the leaderboard
function LeaderBoard() {
  const players = usePlayers();

  // Assuming 'players' is an array of player objects with a 'get' method
  const playerScores = players.map((player) => ({
    score: player.get("score") || 0,
    id: player.id || "Unknown", // Default to "Unknown" if id is not present
  }));

  // Sorting the scores in descending order
  const sortedPlayers = playerScores.sort((a, b) => b.score - a.score);

  // Generating the table content
  const tableContent = sortedPlayers.map((player, index) => (
    <tr key={index} className="border-b">
      <td className="p-2">{player.id}</td>
      <td className="p-2">{player.score}</td>
    </tr>
  ));

  return (
    <div className="max-w-lg mx-auto my-8 p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Leaderboard</h2>
      <table className="w-full">
        <thead>
          <tr>
            <th className="py-2">Player</th>
            <th className="py-2">Score</th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    </div>
  );
}

// Main component for the producer's choices
export function ProducerChoice() {
  const player = usePlayer();

  // Submit for Consumer to enter waiting interface. (Not sure if useEffect is needed)
  if (player.get("role") === "consumer") {
    player.stage.set("submit", true);
  }

  return (
    <div className="flex">
      <div className="flex flex-col  ">
        <Instruction />
        <Choices />
      </div>
      <LeaderBoard />
    </div>
  );
}
