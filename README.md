# Virtual Marketplace Experiment Readme

## Overview

Welcome to the Virtual Marketplace Experiment! Immerse yourself in a unique marketplace simulation where you play the roles of both **a producer and a consumer**.

As a producer, you have the freedom to explore various advertising options, including the intriguing choice of selling a sub-par product at a higher price through deceptive advertisements. On the flip side, consumers are presented with a selection of product advertisements, and they must make informed purchasing decisions.

This project is built on **Empirica**, an open-source virtual lab platform designed for developing and conducting synchronous and interactive human-participant experiments. Empirica offers an API that empowers experiment designers to focus on creating participant-facing views and experiment-specific logic. Visit the [empirica.ly](https://empirica.ly) website for more details.

The project predominantly utilizes **React** and **Tailwind CSS**.

## Implemented Feature - "Warrant"

1. **Introduction of "Warrant" Feature:** The recent update introduces a new feature called "Warrant."

2. **Empowered Producers:** Producers now have the ability to attach a warrant to their advertisements, committing a certain amount of money to assert the truthfulness of the advertisement for a wider audience. 

3. **Types of Warrants:** Producers can now choose from "No Warrant," "Low Warrant," or "High Warrant" for their products.

3. **Challenging System:** 

    - **Interactive Challenges:** Competitors and other players can challenge the warrant if they suspect the claims in the ad are false. The challenge resolution is currently based on whether the production choice (quality) aligns with the advertising choice (quality).

    - **Number of Challenges** Producers can challenge **only one** producer each time.

    - **Deductions System:** If a producer is found to have falsely advertised a product, deductions will be **the number of challenges multiplied by the amount of warrant**.

## Bonus Features

### 1. UI Reorganization
- **Streamlined Layout:** The UI has undergone a revamp for a simplified layout on the 'Advertisements.jsx' page.
- **Enhanced Display:** The layout features two product images with captions, main questions for producers, and a leaderboard on the right-hand side.

### 2. Leaderboard
- **Performance Snapshot:** A leaderboard is now accessible, showcasing the top and bottom producers based on their earnings in the marketplace.
- **Round Insights:** Producers can check the leaderboard in each round to gauge how the market is performing.


### 3. Result Page
- **Post-Challenge Assessment:** After selecting a producer to challenge, players can submit and view the result page.
- **Score Computation:** Scores are calculated based on product price, production cost, warrant, and deductions from challenges.

## Factors

- **Player Count:** The variable `playerCount` determines the number of players in a game.
- **Number of Rounds:** The variable `numRounds` determines the number of rounds a game has.
- **Chat Enablement:** The variable `chatEnabled` determines whether the chat box is enabled.

## How to Use

1. **Clone the Project:** Clone the project from the provided GitHub repository.
2. **Navigate to Project Directory:** Use the terminal and navigate to the project directory.
3. **Launch Empirica:** Enter `empirica` in the terminal and hit the return button.
4. **Access Admin Page:** Visit `localhost:3000/admin` in your browser.
5. **Explore Factors:** Explore the Factors page and Treatments page.
6. **Start Experiment:** Click on "New Batch" to initiate a new experiment.