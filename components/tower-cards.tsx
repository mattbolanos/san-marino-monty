import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { GameState, type Tower } from "@/lib/types";
import Image from "next/image";
import { Landmark } from "lucide-react";
import guaitaLogo from "@/public/guaita.jpg";
import cestaLogo from "@/public/cesta.jpg";
import montaleLogo from "@/public/montale.jpg";
import { cn } from "@/lib/utils";

export const TOWERS: Tower[] = [
  {
    id: 0,
    name: "The Guaita",
    image: guaitaLogo,
  },
  {
    id: 1,
    name: "The Cesta",
    image: cestaLogo,
  },
  {
    id: 2,
    name: "The Montale",
    image: montaleLogo,
  },
];

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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {TOWERS.map((tower) => (
        <Card
          key={tower.id}
          className={cn(
            "hover:scale-105 transition-all",
            revealedTower === tower.id && "opacity-50 cursor-not-allowed",
            selectedTower === tower.id && "ring-2 ring-primary",
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
            />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
