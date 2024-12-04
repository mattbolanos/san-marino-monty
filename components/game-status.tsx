"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock } from "lucide-react";
import { type Tower } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DIALOG_CONTENT_CLASS, DIALOG_FOOTER_CLASS } from "@/app/constants";
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
  handleFinalClimbVerification: (_towerId: number) => void;
  onReset: () => void;
  isTimerRunning: boolean;
  timer: number;
  setTimer: (_time: number) => void;
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
  onReset,
  isTimerRunning,
  timer,
  setTimer,
}: GameStatusProps) => {
  // Dialog should be open when we have something to show
  const isDialogOpen =
    verificationNeeded || gameState === "revealed" || gameState === "final";

  const [showPlayAgain, setShowPlayAgain] = React.useState(false);

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
            <DialogFooter className={DIALOG_FOOTER_CLASS}>
              <Button
                onClick={
                  gameState === "climbing" && revealedTower === null
                    ? handleClimbVerification
                    : () =>
                        handleFinalClimbVerification(towers[selectedTower!].id)
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
            <DialogFooter
              className={cn(DIALOG_FOOTER_CLASS, "flex justify-center gap-4")}
            >
              <Button
                onClick={() =>
                  handleFinalClimbVerification(towers[selectedTower!].id)
                }
                variant="outline"
              >
                Keep {towers[selectedTower!].name}
              </Button>
              <Button
                onClick={() =>
                  handleFinalClimbVerification(towers[remainingTower].id)
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
      return (
        <Dialog open={true}>
          <DialogContent className={DIALOG_CONTENT_CLASS} hideClose>
            <DialogHeader>
              <DialogTitle
                className={cn(
                  "text-2xl -mt-5 mb-3",
                  isCorrect ? "text-green-500" : "text-red-500"
                )}
              >
                {isCorrect ? "Congratulations! 🎉" : "Wrong Tower!"}
              </DialogTitle>

              {isCorrect ? (
                "You picked the correct tower!"
              ) : (
                <>
                  Reach the top of the correct tower:
                  <strong className="text-primary">
                    {" "}
                    {towers[correctTower!].name}
                  </strong>
                </>
              )}
              {isTimerRunning ? (
                <Timer timeRemaining={timer} setTimeRemaining={setTimer} />
              ) : null}
            </DialogHeader>
            <DialogFooter>
              {isCorrect ? (
                <Button onClick={onReset}>
                  Play Again <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : showPlayAgain ? (
                <Button onClick={onReset}>
                  Play Again <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={() => setShowPlayAgain(true)}
                  variant="destructive"
                >
                  <Clock className="mr-0.5 h-4 w-4" />I Made It!
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    }

    return null;
  };

  return renderDialogContent();
};

export default GameStatus;
