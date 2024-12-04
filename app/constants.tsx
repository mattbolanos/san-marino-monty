import guaitaLogo from "@/public/guaita.jpg";
import cestaLogo from "@/public/cesta.jpg";
import montaleLogo from "@/public/montale.jpg";
import { Tower } from "@/lib/types";

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

export const DIALOG_CONTENT_CLASS =
  "w-10/12 max-w-lg sm:mx-8 mx-auto py-10 px-4 rounded-md pb-5";

export const DIALOG_FOOTER_CLASS = "";
