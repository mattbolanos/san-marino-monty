"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CircleHelp } from "lucide-react";

interface WelcomeDialogProps {
  open: boolean;
  onOpenChange: (_open: boolean) => void;
}

const rules = [
  "🗼 Pick a tower & climb up!",
  "❌ One wrong tower revealed",
  "🤔 Stay or switch towers?",
  "🏃‍♂️ If switching, climb new tower",
  "⏱️ Wrong? 10min to reach correct tower",
  "🎉 Right tower = Victory!",
];

const WelcomeContent = ({ open, onOpenChange }: WelcomeDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-11/12 max-w-lg sm:mx-8 mx-auto py-10 px-5 rounded-md">
        <DialogHeader>
          <DialogTitle className="sm:text-2xl text-lg font-bold sm:mb-4 mb-2">
            The San Marino Towers Challenge
          </DialogTitle>
          <span className="text-muted-foreground sm:mb-4 mb-2 block sm:text-base text-sm">
            This is a real-life version of the famous Monty Hall problem using
            the Three Towers of San Marino.
          </span>
        </DialogHeader>

        <h2 className="text-xl font-bold mb-4 text-primary">How to Play</h2>
        {rules.map((rule, index) => (
          <div
            key={index}
            className="flex items-start gap-2 mb-2 last:mb-0 text-sm md:text-base"
          >
            <span className="font-[family-name:var(--font-geist-mono)] text-muted-foreground">
              {index + 1}.
            </span>
            <span>{rule}</span>
          </div>
        ))}
        <Button onClick={() => onOpenChange(false)}>Let&apos;s play!</Button>
      </DialogContent>
    </Dialog>
  );
};

const WelcomeDialog = () => {
  const [open, setOpen] = useState(true);

  return <WelcomeContent open={open} onOpenChange={setOpen} />;
};

const HelpButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="absolute top-0 right-0 sm:p-4 p-2">
      <Button onClick={() => setOpen(true)} variant="ghost" size="icon">
        <CircleHelp className="h-7 w-7" />
      </Button>
      <WelcomeContent open={open} onOpenChange={setOpen} />
    </div>
  );
};

export { WelcomeDialog, HelpButton };
