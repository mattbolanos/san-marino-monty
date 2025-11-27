import { Button } from "@/components/ui/button";
import { Coffee } from "lucide-react";
import Link from "next/link";

const BuyMeACoffee = () => {
  return (
    <Link href="https://www.buymeacoffee.com/mattbolanos" target="_blank">
      <Button
        variant="outline"
        size="lg"
        className="px-6 py-6 bg-[#FFDD00] text-black font-bold border-none rounded-full hover:bg-[#FFDD00]/90 hover:scale-105 transition-all duration-200 shadow-lg gap-2"
      >
        <Coffee className="h-5 w-5" />
        Buy me a coffee
      </Button>
    </Link>
  );
};

export default BuyMeACoffee;
