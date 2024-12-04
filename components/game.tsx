"use client";

import * as React from "react";
import GameStatus from "./game-status";
import { TOWERS, TowerCards } from "./tower-cards";
import { GameState } from "@/lib/types";
import { Timer } from "./timer";

const Game = () => {
  const [gameState, setGameState] = React.useState<GameState>("initial");
  // per client request, Guaita is always the correct tower
  const correctTower: number = 0;

  const [selectedTower, setSelectedTower] = React.useState<number | null>(null);
  const [revealedTower, setRevealedTower] = React.useState<number | null>(null);
  const [isTimerRunning, setIsTimerRunning] = React.useState<boolean>(false);
  // 10 minutes
  const [timer, setTimer] = React.useState<number>(600);
  const [climbingVerificationNeeded, setClimbingVerificationNeeded] =
    React.useState<boolean>(false);

  const handleInitialSelection = (towerId: number) => {
    setSelectedTower(towerId);
    setClimbingVerificationNeeded(true);
    setGameState("climbing");
  };

  const handleClimbVerification = () => {
    setClimbingVerificationNeeded(false);
    const availableToReveal = [0, 1, 2].filter(
      (id) => id !== selectedTower && id !== correctTower
    );
    setRevealedTower(
      availableToReveal[Math.floor(Math.random() * availableToReveal.length)]
    );
    setGameState("revealed");
  };

  const handleFinalSelection = (towerId: number) => {
    setSelectedTower(towerId);
    setClimbingVerificationNeeded(true);
    setGameState("climbing");
  };

  const handleFinalClimbVerification = (towerId: number) => {
    setSelectedTower(towerId);
    setClimbingVerificationNeeded(false);
    setGameState("final");
    if (towerId !== correctTower) {
      setIsTimerRunning(true);
    }
  };

  const resetGame = () => {
    setGameState("initial");
    setSelectedTower(null);
    setRevealedTower(null);
    setIsTimerRunning(false);
    setTimer(600);
    setClimbingVerificationNeeded(false);
  };

  const getRemainingTower = () => {
    return [0, 1, 2].find(
      (id) => id !== selectedTower && id !== revealedTower
    ) as number;
  };

  return (
    <>
      {isTimerRunning ? (
        <Timer timeRemaining={timer} setTimeRemaining={setTimer} />
      ) : null}
      <TowerCards
        selectedTower={selectedTower}
        revealedTower={revealedTower}
        gameState={gameState}
        onInitialSelect={handleInitialSelection}
        onFinalSelect={handleFinalSelection}
      />
      <GameStatus
        towers={TOWERS}
        gameState={gameState}
        verificationNeeded={climbingVerificationNeeded}
        selectedTower={selectedTower}
        revealedTower={revealedTower}
        correctTower={correctTower}
        remainingTower={getRemainingTower()}
        handleClimbVerification={handleClimbVerification}
        handleFinalClimbVerification={handleFinalClimbVerification}
        onReset={resetGame}
      />
    </>
  );
};

export default Game;
