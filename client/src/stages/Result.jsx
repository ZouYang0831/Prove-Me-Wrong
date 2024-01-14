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
  const currentScore = player.round.get("currentScore");

  function handleSubmit() {
    player.stage.set("submit", true);
  }

  return (
    <div className="mt-3 sm:mt-5 p-20">
      <h1 className="text-lg leading-6 font-medium text-gray-900">Sales</h1>
      
      <div className="text-lg mt-2 mb-6">
        <p>
          You chose to produce a <b>{productionQuality}</b>-quality product.
        </p>
        
        <p>
          You chose to advertise it as a <b>{advertisementQuality}</b>-quality product.
          You sold it at a price of <b>${priceOfProduct}</b>. Your warrant is at <b>${amountOfWarrant || 0}</b>.
        </p>
        
        <p>
          It was advertised to an audience of <b>100</b> users, and <b>{numBuyers}</b> users bought your product.
        </p>
        
        <p>
          You earned $<b>{priceOfProduct - productionCost}</b> per product x <b>{numBuyers}</b> units sold - <b>{amountOfWarrant || 0}</b> warrant = <b>{salesCount}</b> points in sales.
        </p>
        
        <br />
        
        <p>Your score for this round is: <b>{salesCount}</b></p>

        <br />
        <p className="text-2xl">Your total score is: <b>{salesCount + currentScore}</b></p>
        
        <br />
        
   
      </div>
      
      <Button handleClick={handleSubmit} primary>
        I'm done!
      </Button>
    </div>
  );
}
