import React from "react";
import { Button } from "../components/Button";
import { usePlayer, usePlayers } from "@empirica/core/player/classic/react";

export function Choice() {
  return (
    <div className="flex">
      <Introduction />
      <Questions />
      <LeaderBoard />
    </div>
  );
}

function Introduction() {
  return (
    <div className="w-128 ml-20 mr-10 mt-10 mb-10">
      <h2 className="text-2xl font-bold mb-6 text-center">
        You are a producer of toothpaste.
      </h2>
      <p className="text-gray-600 mb-8 indent-10 text-justify">
        The following two images depict the products you can manufacture: one is
        standard toothpaste, and the other is an exceptional toothpaste. They
        incur different production costs. It is now your decision to determine
        what to produce, how to advertise it, and at what price.{" "}
      </p>

      <div className="flex items-center space-x-8">
        <figure>
          <img
            src="./images/toothpastestandard.jpg"
            alt="Standard Toothpaste"
            className="w-80"
          />
          <figcaption className="text-center text-base text-black font-bold mt-2">
            Standard Toothpaste
          </figcaption>
        </figure>

        <figure>
          <img
            src="./images/toothpasteamazing.jpg"
            alt="Amazing Toothpaste"
            className="w-80"
          />
          <figcaption className="text-center text-base text-black font-bold mt-2">
            Amazing Toothpaste
          </figcaption>
        </figure>
      </div>
    </div>
  );
}

function Questions() {
  const player = usePlayer();

  function handleProductionChoice(productionQuality) {
    player.round.set("productionQuality", productionQuality);
    if (productionQuality === "low") {
      player.round.set("productionCost", 5);
    }
    if (productionQuality === "high") {
      player.round.set("productionCost", 9);
    }
  }

  function handleAdverisementChoice(advertisementQuality) {
    player.round.set("advertisementQuality", advertisementQuality);
  }

  function handlePriceChoice(priceOfProduct) {
    player.round.set("priceOfProduct", priceOfProduct);
  }

  function handleWarrantChoice(amountOfWarrant) {
    player.round.set("amountOfWarrant", amountOfWarrant);
  }

  function handleSubmit() {
    // Check if all radio inputs are selected

    const allSelected =
      player.round.get("productionQuality") &&
      player.round.get("advertisementQuality") &&
      player.round.get("priceOfProduct");

    if (allSelected) {
      player.stage.set("submit", true);
    } else {
      alert("Not all questions are answered.");
    }
  }

  return (
    <div className="m-10 w-128">
      <h2 className="text-3xl font-bold mb-6 text-center">Make Your Choice</h2>

      <div className="mb-4">
        <h3 className="text-xl mb-2">1. Choose what quality to produce.</h3>

        <div className="flex flex-col">
          <label className="items-center mb-1">
            <input
              type="radio"
              name="quality"
              value="Low Quality"
              className="ml-8 mr-3"
              onChange={() => handleProductionChoice("low")}
            />
            Low Quality
          </label>

          <label className="items-center mb-1">
            <input
              type="radio"
              name="quality"
              value="High Quality"
              className="ml-8 mr-3"
              onChange={() => handleProductionChoice("high")}
            />
            High Quality
          </label>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-xl mb-2">
          2. Choose how you want to advertise it.
        </h3>

        <div className="flex flex-col">
          <label className="items-cente mb-1">
            <input
              type="radio"
              name="advertisement"
              value="Low advertisement"
              className="ml-8 mr-3"
              onChange={() => handleAdverisementChoice("low")}
            />
            Low Advertisement
          </label>

          <label className="items-center mb-1">
            <input
              type="radio"
              name="advertisement"
              value="High advertisement"
              className="ml-8 mr-3"
              onChange={() => handleAdverisementChoice("high")}
            />
            High Advertisement
          </label>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-xl mb-2">3. Choose the price for your product.</h3>

        <div className="flex flex-col">
          <label className="items-center mb-1">
            <input
              type="radio"
              name="price"
              value="Low Price"
              className="ml-8 mr-3"
              onChange={() => handlePriceChoice(10)}
            />
            Low Price
          </label>

          <label className="items-center mb-1">
            <input
              type="radio"
              name="price"
              value="High Price"
              className="ml-8 mr-3"
              onChange={() => handlePriceChoice(15)}
            />
            High Price
          </label>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-xl mb-2">
          4. Choose the amount of warrant you put for the product.
        </h3>

        <div className="flex flex-col">
          <label className="items-center mb-1 ">
            <input
              type="radio"
              name="warrent"
              value="No Warrent"
              className="ml-8 mr-3"
              onChange={() => handleWarrantChoice(0)}
            />
            No Warrant
          </label>

          <label
            className={`items-center mb-1 ${
              player.get("score") < 20 || !player.get("score")
                ? "text-gray-500 cursor-not-allowed"
                : ""
            }`}
          >
            <input
              type="radio"
              name="warrent"
              value="Low Warrent"
              className="ml-8 mr-3"
              onChange={() => handleWarrantChoice(20)}
              disabled={player.get("score") < 100}
            />
            Low Warrant
          </label>

          <label
            className={`items-center mb-1 ${
              player.get("score") < 100 || !player.get("score")
                ? "text-gray-500 cursor-not-allowed"
                : ""
            }`}
          >
            <input
              type="radio"
              name="warrent"
              value="High Warrent"
              className="ml-8 mr-3"
              onChange={() => handleWarrantChoice(100)}
              disabled={player.get("score") < 100}
            />
            High Warrant
          </label>
        </div>
      </div>

      <div className="flex ml-10 mt-5">
        <Button type="submit" handleClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
}

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
