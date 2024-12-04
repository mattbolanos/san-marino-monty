"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { type Tower } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DIALOG_CONTENT_CLASS } from "@/app/constants";
import { cn } from "@/lib/utils";
import { Timer } from "./timer";

interface GameStatusProps {
  gameState: string;
  verificationNeeded: boolean;
  selectedTower: number | null;
  revealedTower: number | null;
  correctTower: number | null;
  towers: Tower[];
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
            <DialogHeader>
              <DialogTitle>🧗 Get Climbing!</DialogTitle>
              <DialogDescription>
                Climb to the top of {towers[selectedTower!].name}!
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
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
            <DialogHeader>
              <DialogTitle className="mb-0.5">
                🔍 We&apos;ve discovered something!
              </DialogTitle>
              <DialogDescription>
                ❌{" "}
                <strong className="text-red-500">
                  {towers[revealedTower!].name}
                </strong>{" "}
                is incorrect
              </DialogDescription>
            </DialogHeader>
            <div className="py-0.5 text-center">
              <p className="mb-1.5">
                You currently have{" "}
                <strong className="text-primary">
                  {towers[selectedTower!].name}
                </strong>{" "}
                selected
              </p>
              <p>Would you like to:</p>
            </div>
            <DialogFooter className="flex sm:justify-center">
              <Button
                onClick={() =>
                  handleFinalClimbVerification(
                    towers[selectedTower!].id,
                    "keep"
                  )
                }
                variant="outline"
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
        <Dialog open={finalDialogOpen} onOpenChange={setFinalDialogOpen}>
          <DialogContent
            className={DIALOG_CONTENT_CLASS}
            hideClose={!canCloseDialog}
          >
            <DialogHeader>
              <DialogTitle
                className={cn(
                  "text-2xl -mt-5 mb-3 text-center",
                  isCorrect
                    ? "text-green-500"
                    : consolationWin
                    ? "text-yellow-500"
                    : "text-red-500"
                )}
              >
                {isCorrect
                  ? "Congratulations! This was the correct tower. Challenge complete! 🎉"
                  : consolationWin
                  ? "Nice recovery! You made it to the correct tower in time! Challenge complete! 🎉"
                  : timer === 0
                  ? "Time's up! Challenge failed! ❌"
                  : "Whoops! Wrong choice! You can still finish this challenge if you get to the Guaita before this timer runs out. If you don't, challenge failed"}
              </DialogTitle>

              {isCorrect ? (
                "You picked the correct tower!"
              ) : !consolationWin && timer > 0 ? (
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
