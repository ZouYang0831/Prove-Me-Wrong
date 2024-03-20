/* 
  File: callbacks.js

  Description: 
  This file contains game logic for an Empirica game.
  It defines functions for initializing game rounds, stages,
  assigning roles and values to players, and handling stage events.

  Author: Changxuan Fan
  Date Created: 03/19/2024
*/

import { ClassicListenersCollector } from "@empirica/core/admin/classic";
export const Empirica = new ClassicListenersCollector();

// Fisher-Yates (aka Knuth) Shuffle Algorithm
// Will in-place the original array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Scale down the values in a dictionary (unitDict) proportionally
// if their sum exceeds a specified limit (limit).
// return a new scaled dict
function scaleUnits(unitDict, limit) {
  // Function to sum up the values in a dictionary
  const sumValues = (dict) => {
    return Object.values(dict).reduce((acc, val) => acc + val, 0);
  };

  // Function to get keys from a dictionary based on a condition
  const getKeys = (dict, numOfElements, num) => {
    const indices = [];
    Object.entries(dict).forEach(([key, value]) => {
      if (floatComparator(value, num)) {
        // compare if two floating numbers are equal
        indices.push(key);
      }
    });
    shuffleArray(indices);
    return indices.slice(0, numOfElements);
  };

  // Function to scale values
  const scaleValues = (dict, scaleFactor) => {
    return Object.fromEntries(
      Object.entries(dict).map(([key, value]) => [key, value * scaleFactor])
    );
  };

  // Function to get the decimal parts of scaled values
  const decimalParts = (dict) => {
    return Object.fromEntries(
      Object.entries(dict).map(([key, value]) => [
        key,
        value - Math.floor(value),
      ])
    );
  };

  // Function to round the values in a dictionary
  const roundValues = (dict) => {
    for (let key in dict) {
      if (dict.hasOwnProperty(key)) {
        dict[key] = Math.round(dict[key]);
      }
    }
    return dict;
  };

  // Comparator function for floating-point numbers with adjustable epsilon
  const floatComparator = (a, b, epsilon = 1e-4) => {
    return Math.abs(a - b) < epsilon;
  };

  let scaledDict = {};
  // Calculate sum of unit values
  const unitSum = sumValues(unitDict);

  // return the original unitDict
  if (unitSum <= limit) {
    return unitDict;
  }

  // Randomly Scale Down value(s) one by one if the sum exceeds the limit
  if (unitSum > limit) {
    const scaleFactor = limit / unitSum;

    scaledDict = scaleValues(unitDict, scaleFactor);
    console.log("scaledDict", scaledDict);
    const decimalDict = decimalParts(scaledDict);

    // Round the scaled values
    roundValues(scaledDict);

    // Calculate the number of elements to adjust
    const numOfElements = sumValues(Object.values(scaledDict)) - limit;
    console.log("numOfElements", numOfElements);

    if (numOfElements > 0) {
      const selectedKeys = getKeys(decimalDict, numOfElements, 0.5);
      console.log("selectedKeys1", selectedKeys);
      // Adjust values down for selected keys
      selectedKeys.forEach((key) => {
        if (scaledDict.hasOwnProperty(key)) {
          scaledDict[key] -= 1;
        }
      });
    }
    // Randomly Scale Up value(s) one by one if the sum exceeds the limit
    else if (numOfElements < 0) {
      const valuesUnderHalf = Object.values(decimalDict).filter(
        (value) => value < 0.5
      );
      const largestElement = Math.max(...valuesUnderHalf);
      const selectedKeys = getKeys(
        decimalDict,
        Math.abs(numOfElements),
        largestElement
      );
      console.log("selectedKeys2", selectedKeys);

      // Adjust values up for selected keys
      selectedKeys.forEach((key) => {
        if (scaledDict.hasOwnProperty(key)) {
          scaledDict[key] += 1;
        }
      });
    }
    // If numOfElements == 0, just return.
  }

  console.log("scaledDict", scaledDict);
  // Return the scaled dictionary
  return scaledDict;
}

Empirica.onGameStart(({ game }) => {
  const treatment = game.get("treatment");
  const { roundCount, playerCount, brandCap } = treatment;

  // Add rounds with stages
  for (let i = 0; i < roundCount; i++) {
    const round = game.addRound({ name: `Round ${i}` });

    // Add Select Role stage in the beginning only for the first round
    if (i === 0) {
      round.addStage({ name: "SelectRoles", duration: 10000 });
    }

    round.addStage({ name: "ProducerChoice", duration: 10000 });
    round.addStage({ name: "ConsumerChoice", duration: 10000 });
    round.addStage({ name: "Feedback", duration: 10000 });

    // Add Final Result stage in the end only for the last round
    if (i === roundCount - 1) {
      round.addStage({ name: "FinalResult", duration: 10000 });
    }
  }

  // Create a shuffled copy of the players array
  const shuffledPlayers = shuffleArray([...game.players]);

  // Create random Brands for producers to choose
  const randomBrands = shuffleArray([
    "Akane",
    "Baldwin",
    "Blondee",
    "Cameo",
    "Davey",
    "Empire",
    "Fuji",
    "Gala",
    "Hokuto",
    "Idared",
    "Jazz",
    "Jonathan",
    "Jubilee",
    "Lodi",
    "Melrose",
    "Opal",
    "Pippin",
    "Rome",
    "Sansa",
    "Winesap",
    "Yates",
    "York",
    "Zestar",
  ]);

  // Assign roles and initial values to players
  shuffledPlayers.forEach((player, index) => {
    // Set initial score
    player.set("score", 0);

    // Determine the player's role
    if (index < playerCount / 2) {
      // Producer setup

      player.set("role", "producer");
      player.set("capital", 100);

      // Assigning names: A, then B, then C
      const producerName = "Producer " + String.fromCharCode(65 + index); // A: 65, B: 66, C: 67, and so on...
      player.set("name", producerName);

      // Assign a subset of random brands to the producer
      const startIndex = index * brandCap;
      const endIndex = (index + 1) * brandCap;
      player.set("randomBrands", randomBrands.slice(startIndex, endIndex));
    } else {
      // Consumer Setup
      player.set("role", "consumer");
      player.set("wallet", 100);

      // Assigning names: A, then B, then C
      const consuemrName = "Consumer " + String.fromCharCode(65 + index); // A: 65, B: 66, C: 67, and so on...
      player.set("name", consuemrName);
    }
  });
});

Empirica.onRoundStart(({ round }) => {});

Empirica.onStageStart(({ stage }) => {});

Empirica.onStageEnded(({ stage }) => {
  if (stage.get("name") === "ConsumerChoice") {
    const players = stage.currentGame.players;
    const roundName = stage.round.get("name");

    /*     
      ConsumerData Update
    */
    // Add productQuality to consumerData
    for (const consumer of players) {
      if (consumer.get("role") === "consumer") {
        const consumerRoundData = consumer.get(roundName);
        for (const producer of players) {
          if (producer.get("role") === "producer") {
            consumerRoundData["producers"][producer.id]["productQuality"] =
              producer.get(roundName)["productQuality"];
          }
        }
        console.log("first", consumerRoundData);
        console.log("skdfh", consumer.get("score"));
        console.log();
        consumer.set(roundName, consumerRoundData);
      }
    }

    // Check if consumers buy more than the available stock;
    // if they do, scale down unitedSelected for unitReceived by each consumer accordingly.
    for (const producer of players) {
      if (producer.get("role") === "producer") {
        // Collect unitSelected values for consumers
        let allUnitSelected = {};
        for (const consumer of players) {
          if (consumer.get("role") === "consumer") {
            const unitSelected =
              consumer.get(roundName)["producers"][producer.id]["unitSelected"];
            allUnitSelected[consumer.id] = unitSelected;
          }
        }

        // Scale down units based on unitProduced
        const unitProduced = producer.get(roundName)["unitProduced"];
        console.log("allUnitSelected", allUnitSelected);
        console.log("unitProduced", unitProduced);
        allUnitSelected = scaleUnits(allUnitSelected, unitProduced);
        console.log();

        console.log("second", allUnitSelected);
        console.log();

        // Update unitReceived values for consumers
        for (const consumer of players) {
          if (consumer.get("role") === "consumer") {
            const consuemrRoundData = consumer.get(roundName);
            for (const key in allUnitSelected) {
              // allUnitSelected is a dictionary, so use in
              if (consumer.id === key) {
                consuemrRoundData["producers"][producer.id]["unitReceived"] =
                  allUnitSelected[key];
              }
            }
            console.log("third", consuemrRoundData);
            console.log();

            consumer.set(roundName, consuemrRoundData);
          }
        }
      }
    }

    // update scoreChangeByProducer and scoreChange for one round
    for (const consumer of players) {
      if (consumer.get("role") === "consumer") {
        // Initialize score change for one round
        let scoreChange = 0;
        let walletChange = 0;

        const consumerRoundData = consumer.get(roundName);

        // Loop through producers
        for (const producer of players) {
          if (producer.get("role") === "producer") {
            const producerInfo = consumerRoundData["producers"][producer.id];
            const { productQuality, advertisementQuality, unitReceived } =
              producerInfo;

            // Determine one unit's score change based on product and advertisement quality
            let unitScoreChange = 0;
            if (productQuality === "low") {
              unitScoreChange = advertisementQuality === "low" ? 2 : -4;
            } else {
              unitScoreChange = advertisementQuality === "low" ? 10 : 4;
            }

            // Calculate score change of each producer's product
            let scoreChangeByProducer;
            if (unitReceived == 0) {
              scoreChangeByProducer = 0;
            } else {
              scoreChangeByProducer = unitReceived * unitScoreChange;
            }
            producerInfo["scoreChangeByProducer"] = scoreChangeByProducer;

            // Accumulate score change for this producer's product
            scoreChange += scoreChangeByProducer;

            const price = productQuality === "low" ? 4 : 10;
            walletChange += unitReceived * price;
          }
        }

        // Update the consumer's round score change
        consumerRoundData["scoreChange"] = scoreChange;
        console.log("fourth", consumerRoundData);
        console.log();

        // Update the consumer's data for each producer's product and the whole round
        consumer.set(roundName, consumerRoundData);

        // Update the score
        consumer.set("score", consumer.get("score") + scoreChange);

        consumer.set("wallet", consumer.get("wallet") - walletChange);
      }
    }

    /*
      ProducerData Update
    */
    // Add consumers dictionary to producerData
    // including attributes: scoreChange and totalScoreChange
    for (const producer of players) {
      if (producer.get("role") === "producer") {
        const producerRoundData = producer.get(roundName);

        // Initialize consumers dictionary
        producerRoundData["consumers"] = {};

        const productQuality = producerRoundData["productQuality"];
        const advertisementQuality = producerRoundData["advertisementQuality"];
        const unitProduced = producerRoundData["unitProduced"];

        // Initialize unitSold and scoreChange
        let unitSold = 0;
        let scoreChange = 0;

        // Determine unitScoreChange based on product and advertisement quality
        let unitScoreChange = 0;
        if (productQuality === "low") {
          unitScoreChange = advertisementQuality === "low" ? 2 : 8;
        } else {
          unitScoreChange = advertisementQuality === "low" ? -10 : 4;
        }

        // Loop through consumers to update producerRoundData
        for (const consumer of players) {
          if (consumer.get("role") === "consumer") {
            // Get unitSoldByConsumer and scoreChangeByConsumer
            const unitSoldByConsumer =
              consumer.get(roundName)["producers"][producer.id]["unitReceived"];
            const scoreChangeByConsumer = unitScoreChange * unitSoldByConsumer;

            // Update producerRoundData for each consumer
            producerRoundData["consumers"][consumer.id] = {
              unitSoldByConsumer: unitSoldByConsumer,
              scoreChangeByConsumer: scoreChangeByConsumer,
            };

            // Update unitSold and scoreChange
            unitSold += unitSoldByConsumer;
            scoreChange += scoreChangeByConsumer;
          }
        }

        // Update producerRoundData with total unitSold and scoreChange
        producerRoundData["unitSold"] = unitSold;

        // Delete scores for leftover products
        const cost = productQuality === "low" ? 2 : 4;

        const unitLeft = unitProduced - unitSold;
        const scoreUnitLeftDeducted = unitLeft * cost;

        scoreChange = scoreChange - scoreUnitLeftDeducted;

        // Update scoreChnage
        producerRoundData["unitLeft"] = unitLeft;
        producerRoundData["scoreUnitLeftDeducted"] = scoreUnitLeftDeducted;
        producerRoundData["scoreChange"] = scoreChange;

        // Update producerRoundData
        producer.set(roundName, producerRoundData);

        // Update score
        producer.set("score", producer.get("score") + scoreChange);

        producer.set("capital", producer.get("capital") + scoreChange);
      }
    }
  }
});

Empirica.onRoundEnded(({ round }) => {});

Empirica.onGameEnded(({ game }) => {});
