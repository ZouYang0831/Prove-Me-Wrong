/**
 * Filename: ConsumerChoice.jsx

 * Description: 
 * This file contains components related to the consumer's choices in the game.
 * Main Components include 
 * 
 * Author: Changxuan Fan
 * Created Date: 3/14/2024
 */

import React, { useState, useEffect } from "react";
import { Button } from "../components/Button";
import {
  usePlayer,
  usePlayers,
  useGame,
  useRound,
} from "@empirica/core/player/classic/react";

// Component for displaying game instructions
function Instruction() {
  return (
    <div className="w-180 ml-20 mr-10 mb-8">
      {/* Title */}
      <h1 className="text-xl text-gray-600 font-bold mb-1">Instruction</h1>
      {/* Main Instruction */}
      <p className="text-gray-600 text-justify">
        In this stage, you will purchase the products with advertised quality.
      </p>
      {/* Note */}
      <p className="text-gray-600 font-medium text-justify">
        Note: Your goal is to purchase product with maximum utilities.
      </p>
    </div>
  );
}

// Fisher-Yates (aka Knuth) Shuffle Algorithm
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function ProductCard({ title, image, warrant, focus, handleFocus }) {
  // Define CSS classes for the card
  const cardClasses = `relative w-80 h-80 m-4 p-4 bg-gray-200 rounded-md duration-300 ${
    focus ? "scale-110 bg-gray-400" : ""
  }`;

  return (
    <div className={cardClasses}>
      {/* Render the warrant tag if warrant is not equal to 0 */}
      {warrant !== 0 && (
        <div className="absolute top-2 -right-5 bg-green-500 text-xl text-white px-2 py-1 rounded-md transform rotate-30">
          <span>Warrant: ${warrant}</span> {/* Display the warrant value */}
        </div>
      )}

      {/* Product information */}
      <div className="text-center items-center flex flex-col">
        <h2 className="text-lg font-bold">{title}</h2>
        <img
          src={image}
          onClick={handleFocus}
          alt="Product"
          className="mt-2 w-50 h-50 rounded-md cursor-pointer"
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

  // Image paths
  const lowQualityImage = "./images/low_quality_apple.png";
  const highQualityImage = "./images/high_quality_apple.png";

  // State for products: products for all products
  const [products, setProducts] = useState([]);

  // Variables
  const { accuracyNudgeEnabled, warrantEnabled } = game.get("treatment");
  const roundName = round.get("name");

  // Effect to set all products' state from producers' data
  useEffect(() => {
    const products = players
      .filter((player) => player.get("role") === "producer") // get all producers
      .map((producer) => ({ 
        title: producer.get(roundName)["advertisementQuality"],
        image:
          producer.get(roundName)["advertisementQuality"] === "low"
            ? lowQualityImage
            : highQualityImage,
        warrant: warrantEnabled ? producer.get(roundName)["warrant"] : 0,
        focus: false,
      }));

    // Shuffle the array of products
    shuffleArray(products);

    // Set all products
    setProducts(products);
  }, []);

  // Function to handle products focus when clicking on the image
  const handleProductFocus = (index) => {
    // find and toggle selected product's focus state
    setProducts((prevProducts) =>
      prevProducts.map((product, i) =>
        i === index ? { ...product, focus: !product.focus } : product
      )
    );
  };

  // Function to handle submission
  const handleSubmit = () => {
    if (accuracyNudgeEnabled && !confirmWindowEnabled) {
      setConfirmWindowEnabled(true);
    } else {
      player.stage.set("submit", true);
    }
  };

  // JSX
  return (
    <div className="w-180 ml-20 mr-10 mb-10">
      <div className="flex flex-row space-x-20">
        {/* Display all products */}
        {products.map((product, index) => (
          <ProductCard
            title={product.title}
            image={product.image}
            warrant={product.warrant}
            focus={product.focus}
            handleFocus={() => handleProductFocus(index)}
          />
        ))}
      </div>
      <div className="flex justify-center mt-5">
        <Button className="blue" handleClick={handleSubmit}>
          Submit
        </Button>
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
    <div className="flex">
      <div className="flex flex-col  ">
        <Instruction />
        <Choices />
      </div>
      {/* <LeaderBoard /> */}
    </div>
  );
}
