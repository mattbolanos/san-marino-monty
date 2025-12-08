import Image from "next/image";
import Game from "@/components/game";
import { HelpButton, WelcomeDialog } from "@/components/welcome-dialog";
import jetLagLogo from "@/public/jet-lag.png";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-gradient-to-b from-background to-muted/50 p-4 font-[family-name:var(--font-geist-sans)] pt-10 sm:pt-20">
      <div className="container mx-auto max-w-5xl">
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 drop-shadow-sm">
          Baguashan Challenge
        </h1>
        <WelcomeDialog />
        <HelpButton />
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
