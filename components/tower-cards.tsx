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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 mb-8 w-full max-w-6xl mx-auto">
      {LOCATIONS.map((tower) => (
        <Card
          key={tower.id}
          className={cn(
            "overflow-hidden border-0 shadow-md transition-all duration-300",
            !gameOver &&
              selectedTower === null &&
              "hover:shadow-xl hover:-translate-y-1 hover:ring-2 hover:ring-primary/20",
            !gameOver &&
              revealedTower === tower.id &&
              "opacity-40 grayscale cursor-not-allowed",
            !gameOver && "cursor-pointer",
            gameOver && "cursor-not-allowed",
            !gameOver &&
              selectedTower === tower.id &&
              "ring-4 ring-primary shadow-2xl scale-105"
          )}
          onClick={() => handleTowerClick(tower.id)}
        >
          <CardContent className="p-0">
            <div className="relative w-full aspect-[4/3] overflow-hidden">
              <Image
                src={tower.image}
                alt={tower.name}
                fill
                className="object-cover transition-transform duration-500 hover:scale-110"
                priority
              />
            </div>
          </CardContent>
          <CardHeader className="p-5 text-center">
            <CardTitle className="text-xl font-bold tracking-tight">
              {tower.name}
            </CardTitle>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};
