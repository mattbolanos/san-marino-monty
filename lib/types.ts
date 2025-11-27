import { type StaticImageData } from "next/image";

export interface Location {
  id: number;
  name: string;
  image: StaticImageData;
}

export type GameState =
  | "initial"
  | "verification"
  | "climbing"
  | "revealed"
  | "final"
  | "complete";
