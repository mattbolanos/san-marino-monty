"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { type Tower } from "@/lib/types";

interface GameStatusProps {
  gameState: string;
  verificationNeeded: boolean;
  selectedTower: number | null;
  revealedTower: number | null;
  correctTower: number | null;
  towers: Tower[];
  remainingTower: number;
  onVerifyClimb: () => void;
  onVerifyFinalClimb: () => void;
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
  onVerifyClimb,
  onVerifyFinalClimb,
  onReset,
}: GameStatusProps) => {
  if (verificationNeeded) {
    return (
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-semibold">
          Climb to the top of {towers[selectedTower!].name}!
        </h2>
        <Button
          onClick={
            gameState === "climbing" && revealedTower === null
              ? onVerifyClimb
              : onVerifyFinalClimb
          }
          variant="default"
        >
          I made it to the top!
        </Button>
      </div>
    );
  }

  if (gameState === "revealed") {
    return (
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-semibold">
          Tower {towers[revealedTower!].name} is not the correct one!
        </h2>
        <p className="text-lg">
          Do you want to stick with {towers[selectedTower!].name} or switch to{" "}
          {towers[remainingTower].name}?
        </p>
        <div className="flex justify-center gap-4">
          <Button onClick={() => onVerifyFinalClimb()} variant="outline">
            Stick with {towers[selectedTower!].name}
          </Button>
          <Button onClick={() => onVerifyFinalClimb()} variant="default">
            Switch to {towers[remainingTower].name}
          </Button>
        </div>
      </div>
    );
  }

  if (gameState === "final") {
    return (
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-semibold">
          {selectedTower === correctTower
            ? "Congratulations! You picked the correct tower!"
            : `Wrong tower! Quick - you have 10 minutes to reach ${
                towers[correctTower!].name
              }!`}
        </h2>
        <Button onClick={onReset}>
          Play Again <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    );
  }

  return null;
};

export default GameStatus;
