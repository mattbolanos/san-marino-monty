import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { GameState } from "@/lib/types";
import Image from "next/image";
import { Landmark } from "lucide-react";
import { TOWERS } from "@/app/constants";
import { cn } from "@/lib/utils";

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
    if (revealedTower === towerId) return;
    if (gameState === "initial") onInitialSelect(towerId);
    else if (gameState === "revealed") onFinalSelect(towerId);
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-1">
      {TOWERS.map((tower) => (
        <Card
          key={tower.id}
          className={cn(
            selectedTower === null && "hover:ring-2 hover:ring-chart-1/50",
            "transition-all",
            revealedTower === tower.id && "opacity-50 cursor-not-allowed",
            selectedTower === tower.id && "ring-2 ring-chart-1",
            "cursor-pointer"
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
