import { Landmark } from "lucide-react";
import Image from "next/image";
import { LOCATIONS } from "@/app/constants";
import type { GameState } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface TowerCardsProps {
  selectedTower: number | null;
  revealedTower: number | null;
  gameState: GameState;
  onInitialSelect: (_towerId: number) => void;
  onFinalSelect: (_towerId: number) => void;
}

export const TowerCards = ({
  selectedTower,
  revealedTower,
  gameState,
  onInitialSelect,
  onFinalSelect,
}: TowerCardsProps) => {
  const handleTowerClick = (towerId: number) => {
    if (gameState === "final" && selectedTower === towerId) return;
    if (revealedTower === towerId) return;
    if (gameState === "initial") onInitialSelect(towerId);
    else if (gameState === "revealed") onFinalSelect(towerId);
  };

  const gameOver = gameState === "final";

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-1 mb-6">
      {LOCATIONS.map((tower) => (
        <Card
          key={tower.id}
          className={cn(
            !gameOver &&
              selectedTower === null &&
              "hover:ring-2 hover:ring-chart-1/50",
            "transition-all",
            !gameOver &&
              revealedTower === tower.id &&
              "opacity-50 cursor-not-allowed",
            !gameOver && "cursor-pointer",
            gameOver && "cursor-not-allowed",
            !gameOver && selectedTower === tower.id && "ring-2 ring-chart-1"
          )}
          onClick={() => handleTowerClick(tower.id)}
        >
          <CardHeader>
            <CardTitle className="text-lg">
              <Landmark className="h-5 w-5 inline-block mr-2" />
              {tower.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Image
              src={tower.image}
              alt={tower.name}
              width={300}
              height={300}
              className="w-full h-full object-cover"
              priority
            />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
