import type { Location } from "@/lib/types";
import greatBuddhaImg from "@/public/great-buddha.jpg";
import northPagodaImg from "@/public/north-pagoda.jpg";
import southPagodaImg from "@/public/south-pagoda.jpg";

export const LOCATIONS: Location[] = [
  {
    id: 0,
    name: "Great Buddha Statue",
    image: greatBuddhaImg,
  },
  {
    id: 1,
    name: "North Pagoda",
    image: northPagodaImg,
  },
  {
    id: 2,
    name: "South Pagoda",
    image: southPagodaImg,
  },
];

export const DIALOG_CONTENT_CLASS =
  "w-11/12 max-w-lg sm:mx-auto p-6 sm:p-10 rounded-xl sm:rounded-2xl gap-6";
