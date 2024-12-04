"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
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
}: GameStatusProps) => {
  // Dialog should be open when we have something to show
  const isDialogOpen =
    verificationNeeded || gameState === "revealed" || gameState === "final";

  if (!isDialogOpen) return null;

  const renderDialogContent = () => {
    if (verificationNeeded) {
      return (
        <Dialog open={true}>
          <DialogContent className={DIALOG_CONTENT_CLASS}>
            <DialogHeader>
              <DialogTitle>Verification Needed</DialogTitle>
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
                        handleFinalClimbVerification(towers[selectedTower!].id)
                }
                variant="default"
              >
                I made it to the top!
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
              <DialogTitle>
                {towers[revealedTower!].name} is not the correct tower.
              </DialogTitle>
            </DialogHeader>
            <div className="py-4">
              Do you want to stick with {towers[selectedTower!].name} or switch
              to {towers[remainingTower].name}?
            </div>
            <DialogFooter className="flex justify-center gap-4">
              <Button
                onClick={() =>
                  handleFinalClimbVerification(towers[selectedTower!].id)
                }
                variant="outline"
              >
                Stick with {towers[selectedTower!].name}
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
          <DialogContent className={DIALOG_CONTENT_CLASS}>
            <DialogHeader>
              <DialogTitle>
                {isCorrect ? "Congratulations! 🎉" : "Wrong Tower! ⚠️"}
              </DialogTitle>
              <DialogDescription>
                {isCorrect
                  ? "You picked the correct tower!"
                  : `Quick - you have 10 minutes to reach ${
                      towers[correctTower!].name
                    }!`}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={onReset}>
                Play Again <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
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
