import { ClassicListenersCollector } from "@empirica/core/admin/classic";
export const Empirica = new ClassicListenersCollector();

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
      player.set("role", "producer");
      player.set("capital", 100);

      // Assign a subset of random brands to the producer
      const startIndex = index * brandCap;
      const endIndex = (index + 1) * brandCap;
      player.set("randomBrands", randomBrands.slice(startIndex, endIndex));
    } else {
      player.set("role", "consumer");
      player.set("wallet", 100);
    }
  });

  // Fisher-Yates (aka Knuth) Shuffle Algorithm
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
});

Empirica.onRoundStart(({ round }) => {});

Empirica.onStageStart(({ stage }) => {});

Empirica.onStageEnded(({ stage }) => {
  // if (stage.get("name") !== "Advertisements") {
  //   return;
  // }
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
