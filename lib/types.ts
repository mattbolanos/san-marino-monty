import { type StaticImageData } from "next/image";

export interface Tower {
  id: number;
  name: string;
  image: StaticImageData;
}
