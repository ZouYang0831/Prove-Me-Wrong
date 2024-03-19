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

  // Randomly Scale Down value(s) one by one if the sum exceeds the limit
  if (unitSum > limit) {
    const scaleFactor = limit / unitSum;

    scaledDict = scaleValues(unitDict, scaleFactor);
    const decimalDict = decimalParts(scaledDict);

    // Round the scaled values
    roundValues(scaledDict);

    // Calculate the number of elements to adjust
    const numOfElements = sumValues(Object.values(scaledDict)) - limit;

    if (numOfElements > 0) {
      const selectedKeys = getKeys(decimalDict, numOfElements, 0.5);

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

      // Adjust values up for selected keys
      selectedKeys.forEach((key) => {
        if (scaledDict.hasOwnProperty(key)) {
          scaledDict[key] += 1;
        }
      });
    }
    // If numOfElements == 0, just return.
  }

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
        allUnitSelected = scaleUnits(allUnitSelected, unitProduced);

        // Update unitReceived values for consumers
        for (const consumer of players) {
          if (consumer.get("role") === "consumer") {
            for (const key in allUnitSelected) {
              // allUnitSelected is a dictionary, so use in
              if (consumer.id === key) {
                const consuemrRoundData = consumer.get(roundName);
                consuemrRoundData["producers"][producer.id]["unitReceived"] =
                  allUnitSelected[key];
                consumer.set(roundName, consuemrRoundData);
              }
            }
          }
        }
      }
    }

    // update scoreChangeByProducer and scoreChange for one round
    for (const consumer of players) {
      if (consumer.get("role") === "consumer") {
        // Initialize score change for one round
        let roundScoreChange = 0;

        const consumerRoundData = consumer.get(roundName);

        // Loop through producers
        for (const producer of players) {
          if (producer.get("role") === "producer") {
            const producerInfo = consumerRoundData["producers"][producer.id];
            const productQuality = producerInfo["productQuality"];
            const advertisementQuality = producerInfo["advertisementQuality"];
            const unitReceived = producerInfo["unitReceived"];

            // Determine one unit's score change based on product and advertisement quality
            let unitScoreChange = 0;
            if (productQuality === "low") {
              unitScoreChange = advertisementQuality === "low" ? 2 : -4;
            } else {
              unitScoreChange = advertisementQuality === "low" ? 10 : 4;
            }

            // Calculate score change of each producer's product
            const scoreChangeByProducer = unitReceived * unitScoreChange;
            consumerRoundData["producers"][producer.id][
              "scoreChangeByProducer"
            ] = scoreChangeByProducer;

            // Accumulate score change for this producer's product
            roundScoreChange += scoreChangeByProducer;
          }
        }

        // Update the consumer's round score change
        consumerRoundData["scoreChange"] = roundScoreChange;

        // Update the consumer's data for each producer's product and the whole round
        consumer.set(roundName, consumerRoundData);

        // Update the score
        consumer.set("score", consumer.get("score") + roundScoreChange);
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

        // Initialize unitSold and scoreChange
        let unitSold = 0;
        let scoreChange = 0;

        // Determine unitScoreChange based on product and advertisement quality
        let unitScoreChange = 0;
        if (productQuality === "low") {
          unitScoreChange = advertisementQuality === "low" ? 2 : -8;
        } else {
          unitScoreChange = advertisementQuality === "low" ? -2 : 4;
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
        producerRoundData["scoreChange"] = scoreChange;

        producer.set(roundName, producerRoundData);

        // Update score
        producer.set("score", producer.get("score") + scoreChange);
      }
    }
  }
});

Empirica.onRoundEnded(({ round }) => {});

Empirica.onGameEnded(({ game }) => {});
