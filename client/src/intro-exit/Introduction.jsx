import React from "react";
import { Button } from "../components/Button";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export function Introduction({ next }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar
        stageTitle="Welcome to Marketplace Game!"
      />
      <div className="flex-grow mt-1 sm:mt-5 p-10">
        <h1
          className="text-lg leading-6 font-large text-gray-900"
          style={{ fontSize: "30px" }}
        >
          🌟 Welcome to Marketplace Game! 🌟
        </h1><br/>
        <div className="text-lg mt-10 mb-6" style={{ fontSize: "20px" }}>
          <p>
          In this game, you'll be playing alongside three other participants, assuming one of two roles: consumers or producers. The objective for all players is the same: to achieve the highest scores possible!
          </p>
          <br />
          <p>
          Each round, producers will decide on the quality of products they wish to produce and strategize on how to market their quality. On the other side, consumers are tasked with discerning the true quality of these products based on the information available to them, both before and after making a purchase.
          Let's explore the strategies for winning points!
          </p>
        </div>
        <Button handleClick={next} autoFocus>
          <p>Next</p>
        </Button>
      </div> 
      <Footer />
    </div>  
  );
}
