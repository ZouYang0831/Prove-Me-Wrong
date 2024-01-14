import React from "react";
import { Button } from "../components/Button";
import { usePlayer, usePlayers } from "@empirica/core/player/classic/react";

export function Challenge() {
  const players = usePlayers();
  const player = usePlayer();

  // Assuming 'players' is an array of player objects with a 'get' method
  const playerScores = players.map((player) => ({
    id: player.id || "Unknown", // Default to "Unknown" if id is not present
    score: player.get("score") || 0,
    salesCount: player.round.get("salesCount"),
    productionQuality: player.round.get("productionQuality"),
    advertisementQuality: player.round.get("advertisementQuality"),
    priceOfProduct: player.round.get("priceOfProduct"),
    amountOfWarrant: player.round.get("amountOfWarrant"),
  }));

  // Sorting the scores in descending order
  const sortedPlayers = playerScores.sort((a, b) => b.score - a.score);

  function handlePlayerSelection(challengePlayerId) {
    player.set("challengePlayerId", challengePlayerId);
  }

  function handleSubmit() {
    const challengePlayerId = player.get("challengePlayerId");
    if (challengePlayerId) {
      const challengePlayer = players.find(
        (player) => player.id === challengePlayerId
      );
      const numChallenges = challengePlayer.round.get("numChallenges") || 0;
      challengePlayer.round.set("numChallenges", numChallenges + 1);
    }

    player.stage.set("submit", true);
  }

  // Generating the table content
  const tableContent = sortedPlayers.map((player, index) => (
    <tr key={index}>
      <td className="p-2">{player.id}</td>
      <td className="p-2">{player.score}</td>
      <td className="p-2">{player.salesCount}</td>
      <td className="p-2">{player.productionQuality}</td>
      <td className="p-2">{player.advertisementQuality}</td>
      <td className="p-2">{player.priceOfProduct}</td>
      <td className="p-2">{player.amountOfWarrant}</td>

      <td className="p-2">
        <input
          type="radio"
          name="player"
          value={player.id}
          className="ml-4"
          onChange={() => handlePlayerSelection(player.id)}
        />
      </td>
    </tr>
  ));

  return (
    <div className="w-3/5 min-w-250 mx-auto my-8 p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Challenge the Producer's Warrant
      </h2>

      <p className="indent-6 m-4 text-justify" >
        If the producer you challenge advertises a low-quality product as high
        quality, their sales will be deducted by the amount of warranty they
        specified, multiplied by the number of producers who challenged them.
        You can only challenge one producer, and it is also acceptable not to
        challenge any producers.
      </p>

      <p className="m-4 text-xl font-semibold">
        Select the Producer:
      </p>

      <table className="w-full text-left p-4">
        <thead>
          <tr>
            <th className="p-2">Producer</th>
            <th className="p-2">Score</th>
            <th className="p-2">Sales</th>
            <th className="p-2">Production</th>
            <th className="p-2">Advertisement</th>
            <th className="p-2">Price</th>
            <th className="p-2">Warrant</th>
            <th className="p-2 text-red-600">Select</th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>

      <div className="flex justify-center mt-8">
        <Button type="submit" handleClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
}
