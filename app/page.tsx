import Image from "next/image";
import jetLagLogo from "@/public/jet-lag.png";
import Game from "@/components/game";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-gradient-to-r from-background to-accent/30 p-4 font-[family-name:var(--font-geist-sans)] pt-10">
      <div className="container mx-auto">
        <h1 className="sm:text-4xl text-2xl font-medium text-center my-8">
          San Marino Towers Challenge
        </h1>

        <Game />
      </div>
      <div className="absolute top-0 left-0 sm:p-4 p-3">
        <Image
          src={jetLagLogo}
          alt="Jet Lag Logo"
          width={50}
          height={50}
          className="sm:h-12 sm:w-12 w-9 h-9"
        />
      </div>
    </main>
  );
}
