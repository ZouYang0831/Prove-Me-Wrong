import React from "react";
import { Button } from "../components/Button";
import { usePlayer } from "@empirica/core/player/classic/react";

export function Result() {
  const player = usePlayer();

  const productionQuality = player.round.get("productionQuality");
  const advertisementQuality = player.round.get("advertisementQuality");
  const priceOfProduct = player.round.get("priceOfProduct");
  const productionCost = player.round.get("productionCost");
  const amountOfWarrant = player.round.get("amountOfWarrant") || 0;
  const numBuyers = player.round.get("numBuyers");
  const salesCount = player.round.get("salesCount");
  const numChallenges = player.round.get("numChallenges") || 0;

  const score = player.get("score");

  function handleSubmit() {
    if (productionQuality == "low" && advertisementQuality == "high") {
      player.set("score", score - amountOfWarrant * numChallenges);
    }

    player.stage.set("submit", true);
  }

  return (
    <div className="w-3/5 min-w-220 mx-auto my-8 p-12 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-medium text-center mb-8">Sales Result</h1>

      <div className="text-lg mt-2 mb-6 indent-6">
        <p>
          You chose to produce <b>{productionQuality}</b>-quality product,
          advertise as <b>{advertisementQuality}</b>-quality product, sold it at
          a price of <b>${priceOfProduct}</b>, put a warrant at{" "}
          <b>${amountOfWarrant || 0}</b>.
        </p>

        <br />
        <p>
          It was advertised to an audience of <b>100</b> users, and{" "}
          <b>{numBuyers}</b> users bought your product. You earned $
          <b>{priceOfProduct - productionCost}</b> per unit x <b>{numBuyers}</b>{" "}
          buyers - $<b>{amountOfWarrant || 0}</b> warrant = <b>{salesCount}</b>{" "}
          points in sales.
        </p>

        <br />
        {(productionQuality == advertisementQuality ||
          (productionQuality == "high" && advertisementQuality == "low")) && (
          <>
            <p>
              Since you did not fake advertise your product, Your score for this
              round is: <b>{salesCount}</b>
            </p>
            <br />
            <p className="text-xl text-center">
              Your total score is: <b>{score}</b>
            </p>
          </>
        )}

        {productionQuality == "low" && advertisementQuality == "high" && (
          <>
            <p>
              Since you falsely advertised your product's quality as high, set
              warrant at $<b>{amountOfWarrant}</b> for the product, and{" "}
              <b>{numChallenges}</b> producers have challenged your warrant,
              your sales will be deducted by $<b>{amountOfWarrant}</b> *{" "}
              <b>{numChallenges}</b> = <b>{amountOfWarrant * numChallenges}</b>{" "}
              points.
            </p>

            <br />
            <p>
              Your score for this round is{" "}
              <b>{salesCount - amountOfWarrant * numChallenges}</b>
            </p>

            <br />
            <p className="text-2xl text-center font-medium">
              Your total score is:{" "}
              <b>{score - amountOfWarrant * numChallenges}</b>
            </p>
          </>
        )}
      </div>

      <div className="flex justify-center">
        <Button handleClick={handleSubmit} primary>
          I'm done!
        </Button>
      </div>
    </div>
  );
}
