import { type StaticImageData } from "next/image";

export interface Tower {
  id: number;
  name: string;
  image: StaticImageData;
}

export type GameState =
  | "initial"
  | "climbing"
  | "revealed"
  | "final"
  | "complete";
