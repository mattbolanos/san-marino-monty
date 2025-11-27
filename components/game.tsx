"use client";

import * as React from "react";
import { DIALOG_CONTENT_CLASS, LOCATIONS } from "@/app/constants";
import BuyMeACoffee from "@/components/buy-me-coffee";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { GameState } from "@/lib/types";
import { cn } from "@/lib/utils";
import GameStatus from "./game-status";
import { TowerCards } from "./tower-cards";

const Game = () => {
  const [gameState, setGameState] = React.useState<GameState>("initial");
  // per client request, Guaita is always the correct tower
  const correctTower: number = 0;
  const [selectedTower, setSelectedTower] = React.useState<number | null>(null);
  const [revealedTower, setRevealedTower] = React.useState<number | null>(null);
  const [isTimerRunning, setIsTimerRunning] = React.useState<boolean>(false);
  // 5 minutes
  const [timer, setTimer] = React.useState<number>(300);
  const [showVerificationDialog, setShowVerificationDialog] =
    React.useState(false);
  const [pendingTowerSelection, setPendingTowerSelection] = React.useState<
    number | null
  >(null);
  const [climbingVerificationNeeded, setClimbingVerificationNeeded] =
    React.useState<boolean>(false);
  const [consolationWin, setConsolationWin] = React.useState(false);
  const [showFinalText, setShowFinalText] = React.useState(false);

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

  const handleFinalClimbVerification = (
    towerId: number,
    action: "keep" | "switch"
  ) => {
    setSelectedTower(towerId);
    setClimbingVerificationNeeded(action === "switch");

    setGameState("final");
    if (towerId !== correctTower) {
      setIsTimerRunning(true);
    }
  };

  const getRemainingTower = () => {
    return [0, 1, 2].find(
      (id) => id !== selectedTower && id !== revealedTower
    ) as number;
  };

  const win = selectedTower === correctTower || consolationWin;

  return (
    <>
      <Dialog
        open={showVerificationDialog}
        onOpenChange={setShowVerificationDialog}
      >
        <DialogContent className={DIALOG_CONTENT_CLASS}>
          <DialogHeader className="text-center">
            <DialogTitle className="text-2xl sm:text-3xl mb-4">
              Confirm {LOCATIONS[pendingTowerSelection ?? 0].name}
            </DialogTitle>
            <DialogDescription className="text-lg">
              Are you sure you want to select this location?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center w-full gap-3 flex-col-reverse sm:flex-row">
            <Button
              variant="outline"
              onClick={handleVerificationCancel}
              className="w-full sm:w-auto py-6"
            >
              Cancel
            </Button>
            <Button
              onClick={handleVerificationConfirm}
              className="w-full sm:w-auto py-6"
            >
              Confirm Selection
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {showFinalText ? (
        <div className="inset-0 flex items-center justify-center z-50  mb-10 flex-col gap-4">
          <h1
            className={cn(
              "text-4xl font-bold text-center",
              win ? "text-green-500" : "text-red-500"
            )}
          >
            {win ? "YOU WIN! 🎉" : "GAME OVER ❌"}
          </h1>
          <BuyMeACoffee />
        </div>
      ) : null}
      <TowerCards
        selectedTower={selectedTower}
        revealedTower={revealedTower}
        gameState={gameState}
        onInitialSelect={handleInitialSelection}
        onFinalSelect={handleFinalSelection}
      />
      <GameStatus
        towers={LOCATIONS}
        gameState={gameState}
        verificationNeeded={climbingVerificationNeeded}
        selectedTower={selectedTower}
        revealedTower={revealedTower}
        correctTower={correctTower}
        remainingTower={getRemainingTower()}
        handleClimbVerification={handleClimbVerification}
        handleFinalClimbVerification={handleFinalClimbVerification}
        isTimerRunning={isTimerRunning}
        timer={timer}
        setTimer={setTimer}
        setIsTimerRunning={setIsTimerRunning}
        consolationWin={consolationWin}
        setConsolationWin={setConsolationWin}
        setShowFinalText={setShowFinalText}
      />
    </>
  );
};

export default Game;
