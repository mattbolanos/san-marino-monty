"use client";

import * as React from "react";
import GameStatus from "./game-status";
import { TowerCards } from "./tower-cards";
import { GameState } from "@/lib/types";
import {
  DIALOG_CONTENT_CLASS,
  DIALOG_FOOTER_CLASS,
  TOWERS,
} from "@/app/constants";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Game = () => {
  const [gameState, setGameState] = React.useState<GameState>("initial");
  // per client request, Guaita is always the correct tower
  const correctTower: number = 0;
  const [selectedTower, setSelectedTower] = React.useState<number | null>(null);
  const [revealedTower, setRevealedTower] = React.useState<number | null>(null);
  const [isTimerRunning, setIsTimerRunning] = React.useState<boolean>(false);
  // 10 minutes
  const [timer, setTimer] = React.useState<number>(600);
  const [showVerificationDialog, setShowVerificationDialog] =
    React.useState(false);
  const [pendingTowerSelection, setPendingTowerSelection] = React.useState<
    number | null
  >(null);
  const [climbingVerificationNeeded, setClimbingVerificationNeeded] =
    React.useState<boolean>(false);

  const handleInitialSelection = (towerId: number) => {
    setPendingTowerSelection(towerId);
    setShowVerificationDialog(true);
    setGameState("verification");
  };

  const handleVerificationConfirm = () => {
    if (pendingTowerSelection !== null) {
      setSelectedTower(pendingTowerSelection);
      setClimbingVerificationNeeded(true);
      setGameState("climbing");
      setShowVerificationDialog(false);
    }
  };

  const handleVerificationCancel = () => {
    setPendingTowerSelection(null);
    setShowVerificationDialog(false);
    setGameState("initial");
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
      <Dialog
        open={showVerificationDialog}
        onOpenChange={setShowVerificationDialog}
      >
        <DialogContent className={DIALOG_CONTENT_CLASS}>
          <DialogHeader>
            <DialogTitle>
              Confirm {TOWERS[pendingTowerSelection ?? 0].name}
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to select this tower?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter
            className={cn(DIALOG_FOOTER_CLASS, "flex justify-end gap-2")}
          >
            <Button variant="outline" onClick={handleVerificationCancel}>
              Cancel
            </Button>
            <Button onClick={handleVerificationConfirm}>
              Confirm Selection
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
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
        isTimerRunning={isTimerRunning}
        timer={timer}
        setTimer={setTimer}
      />
    </>
  );
};

export default Game;
