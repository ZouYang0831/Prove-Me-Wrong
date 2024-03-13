import { ClassicListenersCollector } from "@empirica/core/admin/classic";
export const Empirica = new ClassicListenersCollector();

Empirica.onGameStart(({ game }) => {
  const treatment = game.get("treatment");
  const { roundCount } = treatment;

  // Add rounds with stages
  for (let i = 0; i < roundCount; i++) {
    const round = game.addRound({ name: `Round ${i}` });

    // Add Select Role stage in the beginning
    if (i === 0) {
      round.addStage({ name: "SelectRoles", duration: 10000 });
    }

    round.addStage({ name: "ProducerChoice", duration: 10000 });
    round.addStage({ name: "ConsumerChoice", duration: 10000 });
    round.addStage({ name: "Feedback", duration: 10000 });

    // Add Final Result stage in the end
    if (i === roundCount - 1) {
      round.addStage({ name: "FinalResult", duration: 10000 });
    }
  }

  let players = game.players;

  // Shuffle the array of players
  players = [...players].sort(() => Math.random() - 0.5);

  // Assign roles and initial values to players
  players.forEach((player, index) => {
    // Set initial score
    player.set("score", 0);

    // Determine role and set initial wallet or capital accordingly
    const role = index < 2 ? "consumer" : "producer";
    player.set("role", role);
    if (role === "producer") {
      player.set("capital", 100);
    } else {
      player.set("wallet", 100);
    }
  });
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
