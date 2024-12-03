import Image from "next/image";
import jetLagLogo from "@/public/jet-lag.png";
import Game from "@/components/game";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-gradient-to-r from-background to-accent/30 p-4 font-[family-name:var(--font-geist-sans)] pb-24">
      <div className="container mx-auto">
        <h1 className="sm:text-4xl text-2xl font-medium text-center my-8">
          San Marino Towers Challenge
        </h1>
        <Game />
      </div>
      <div className="absolute bottom-0 right-0 p-4">
        <Image
          src={jetLagLogo}
          alt="Jet Lag Logo"
          width={50}
          height={50}
          className="sm:h-12 sm:w-12 w-10 h-10"
        />
      </div>
    </main>
  );
}
