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
    const round = game.addRound({ name: `Round${i}` });

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
    const treatment = stage.currentGame.get("treatment");
    const players = stage.currentGame.players;
    const roundName = stage.round.get("name");

    // Add productQuality to consumerData
    for (const consumer of players) {
      if (consumer.get("role") === "consumer") {
        const producerData = consumer.get(roundName);
        for (const producer of players) {
          if (producer.get("role") === "producer") {
            producerData["producers"][producer.id]["productQuality"] =
              producer.get(roundName)["productQuality"];
          }
        }
        consumer.set(roundName, producerData);
      }
    }

    // Check if consumers buy more than the available stock;
    // if they do, scale down unitedSelected for unitPurchased by each consumer accordingly.
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

        // Update unitPurchased values for consumers
        for (const consumer of players) {
          if (consumer.get("role") === "consumer") {
            for (const key in allUnitSelected) {
              // allUnitSelected is a dictionary, so use in
              if (consumer.id === key) {
                const producers = consumer.get(roundName);
                producers["producers"][producer.id]["unitPurchased"] =
                  allUnitSelected[key];
                consumer.set(roundName, producers);
              }
            }
          }
        }
      }
    }

    // update scoreChange for consumers
    
  }
  // const players = stage.currentGame.players;
  // for (const player of players) {
  //   const priceOfProduct = player.round.get("priceOfProduct");
  //   const productionCost = player.round.get("productionCost");
  //   const amountOfWarrant = player.round.get("amountOfWarrant") || 0;
  //   const score = player.get("score") || 0; // , adQuality, points, salesCount, numBuyers
  //   const min = 0;
  //   const max = 100;
  //   const numBuyers = Math.floor(Math.random() * (max - min) + min);
  //   const salesCount =
  //     numBuyers * (priceOfProduct - productionCost) - amountOfWarrant;
  //   player.round.set("numBuyers", numBuyers);
  //   player.round.set("salesCount", salesCount);
  //   console.log(salesCount);
  //   player.set("score", score + salesCount);
  // }
});

Empirica.onRoundEnded(({ round }) => {});

Empirica.onGameEnded(({ game }) => {});
