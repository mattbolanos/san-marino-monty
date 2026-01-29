"use client";

import { Clock } from "lucide-react";
import * as React from "react";
import { DIALOG_CONTENT_CLASS } from "@/app/constants";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { GameState, Location } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Timer } from "./timer";

interface GameStatusProps {
  gameState: GameState;
  verificationNeeded: boolean;
  selectedTower: number | null;
  revealedTower: number | null;
  correctTower: number | null;
  towers: Location[];
  remainingTower: number;
  handleClimbVerification: () => void;
  handleFinalClimbVerification: (
    _towerId: number,
    _action: "keep" | "switch"
  ) => void;
  isTimerRunning: boolean;
  timer: number;
  setTimer: (_time: number) => void;
  setIsTimerRunning: (_isTimerRunning: boolean) => void;
  consolationWin: boolean;
  setConsolationWin: (_consolationWin: boolean) => void;
  setShowFinalText: (_showFinalText: boolean) => void;
}

const GameStatus = ({
  gameState,
  verificationNeeded,
  selectedTower,
  revealedTower,
  correctTower,
  towers,
  remainingTower,
  handleClimbVerification,
  handleFinalClimbVerification,
  isTimerRunning,
  timer,
  setTimer,
  setIsTimerRunning,
  consolationWin,
  setConsolationWin,
  setShowFinalText,
}: GameStatusProps) => {
  // Dialog should be open when we have something to show
  const isDialogOpen =
    verificationNeeded || gameState === "revealed" || gameState === "final";
  const [finalDialogOpen, setFinalDialogOpen] = React.useState(true);

  const handleConsolationWin = () => {
    if (timer > 0) {
      setConsolationWin(true);
    }
    setIsTimerRunning(false);
  };

  if (!isDialogOpen) return null;

  const renderDialogContent = () => {
    if (verificationNeeded) {
      return (
        <Dialog open={true}>
          <DialogContent className={DIALOG_CONTENT_CLASS} hideClose>
            <DialogHeader className="text-center">
              <DialogTitle className="text-2xl sm:text-3xl mb-2">
                {towers[selectedTower!].id === 0
                  ? "🧗 Get Climbing!"
                  : "🏃 Go Go Go!"}
              </DialogTitle>
              <DialogDescription className="text-lg">
                {towers[selectedTower!].id === 0
                  ? "Climb to the top of"
                  : "Go to"}{" "}
                <span className="font-semibold text-primary">
                  {towers[selectedTower!].name}
                </span>
                !
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="sm:justify-center w-full">
              <Button
                onClick={
                  gameState === "climbing" && revealedTower === null
                    ? handleClimbVerification
                    : () =>
                        handleFinalClimbVerification(
                          towers[selectedTower!].id,
                          "keep"
                        )
                }
                variant="default"
                className="w-full sm:w-auto text-lg py-6"
              >
                Click when you make it!
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    }

    if (gameState === "revealed") {
      return (
        <Dialog open={true}>
          <DialogContent className={DIALOG_CONTENT_CLASS}>
            <DialogHeader className="text-center">
              <DialogTitle className="text-2xl sm:text-3xl mb-4">
                🔍 We&apos;ve discovered something!
              </DialogTitle>
              <DialogDescription className="text-lg w-full text-center bg-destructive/10 p-4 rounded-lg text-destructive-foreground">
                ❌{" "}
                <strong className="text-destructive">
                  {towers[revealedTower!].name}
                </strong>{" "}
                is incorrect
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 text-center space-y-4">
              <p className="text-lg">
                You currently have{" "}
                <strong className="text-primary text-xl">
                  {towers[selectedTower!].name}
                </strong>{" "}
                selected
              </p>
              <p className="text-muted-foreground">Would you like to:</p>
            </div>
            <DialogFooter className="flex flex-col sm:flex-row gap-3 sm:justify-center w-full">
              <Button
                onClick={() =>
                  handleFinalClimbVerification(
                    towers[selectedTower!].id,
                    "keep"
                  )
                }
                variant="outline"
                className="w-full sm:w-auto py-6"
              >
                Keep {towers[selectedTower!].name}
              </Button>
              <Button
                onClick={() =>
                  handleFinalClimbVerification(
                    towers[remainingTower].id,
                    "switch"
                  )
                }
                variant="default"
                className="w-full sm:w-auto py-6"
              >
                Switch to {towers[remainingTower].name}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    }

    if (gameState === "final") {
      const isCorrect = selectedTower === correctTower;
      const canCloseDialog = isCorrect || consolationWin || timer === 0;
      return (
        <Dialog
          open={finalDialogOpen}
          onOpenChange={(open) => {
            setFinalDialogOpen(open);
            setShowFinalText(true);
          }}
        >
          <DialogContent
            className={DIALOG_CONTENT_CLASS}
            hideClose={!canCloseDialog}
          >
            <DialogHeader>
              <DialogTitle
                className={cn(
                  "text-2xl  mb-3 text-center",
                  isCorrect
                    ? "text-green-500"
                    : consolationWin
                    ? "text-yellow-500"
                    : "text-red-500"
                )}
              >
                {isCorrect
                  ? "Congratulations! This was the correct location. Challenge complete! 🎉"
                  : consolationWin
                  ? "Nice recovery! You made it to the correct location in time! Challenge complete! 🎉"
                  : timer === 0
                  ? "Time's up! Challenge failed! ❌"
                  : "Whoops! Wrong choice! You can still finish this challenge if you get to the Great Buddha Statue before this timer runs out. If you don't, challenge failed"}
              </DialogTitle>

              {isCorrect ? null : !consolationWin && timer > 0 ? (
                <>
                  Reach the top of the correct tower:
                  <strong className="text-primary">
                    {" "}
                    {towers[correctTower!].name}
                  </strong>
                </>
              ) : null}
              {isTimerRunning && timer > 0 ? (
                <Timer timeRemaining={timer} setTimeRemaining={setTimer} />
              ) : null}
            </DialogHeader>
            {isTimerRunning && timer > 0 ? (
              <DialogFooter>
                <Button variant="destructive" onClick={handleConsolationWin}>
                  <Clock className="mr-0.5 h-4 w-4" />I Made It!
                </Button>
              </DialogFooter>
            ) : null}
          </DialogContent>
        </Dialog>
      );
    }

    return null;
  };

  return renderDialogContent();
};

export default GameStatus;
