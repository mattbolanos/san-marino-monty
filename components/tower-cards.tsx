import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { type Tower } from "@/lib/types";
import Image from "next/image";
import { Landmark } from "lucide-react";
import guaitaLogo from "@/public/guaita.jpg";
import cestaLogo from "@/public/cesta.jpg";
import montaleLogo from "@/public/montale.jpg";

const TOWERS: Tower[] = [
  {
    id: 0,
    name: "Guaita",
    image: guaitaLogo,
  },
  {
    id: 1,
    name: "Cesta",
    image: cestaLogo,
  },
  {
    id: 2,
    name: "Montale",
    image: montaleLogo,
  },
];

const TowerCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {TOWERS.map((tower) => (
        <Card
          key={tower.id}
          className="hover:scale-105 transition-all cursor-pointer"
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

export default TowerCards;
