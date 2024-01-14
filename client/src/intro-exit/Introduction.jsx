import React from "react";
import { Button } from "../components/Button";

export function Introduction({ next }) {
  return (
    <div className="mt-1 sm:mt-5 p-10">
      <h1
        className="text-lg leading-6 font-large text-gray-900"
        style={{ fontSize: "30px" }}
      >
        Marketplace Instructions
      </h1>
      <div className="text-lg mt-10 mb-6">
        <p>
          In this marketplace, you will have to choose what your priorities are
          as a producer of toothpaste. You will be shown multiple products.
        </p>
        <br />
        In <strong>each round of the game</strong>, you will:
        <br />
        <p>
          (a) choose the quality of the product you produce. Choose how to
          advertise them. Choose what price you want to sell the product for.
        </p>
        <p>
          (b) obtain the results, gains and losses, based on the sales from the
          product you chose to advertise.
        </p>
      </div>
      <Button handleClick={next} autoFocus>
        <p>Next</p>
      </Button>
    </div>
  );
}
