import { Button } from "@/components/ui/button";
import { Coffee } from "lucide-react";
import Link from "next/link";

const BuyMeACoffee = () => {
  return (
    <Link
      href="https://www.buymeacoffee.com/mattbolanos"
      target="_blank"
      className="cursor-pointer"
    >
      <Button
        variant="outline"
        size="sm"
        className="inline-flex items-center px-4 py-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-opacity-50"
      >
        <Coffee className="mr-1 h-4 w-4" />
        Buy me a coffee
      </Button>
    </Link>
  );
};

export default BuyMeACoffee;
