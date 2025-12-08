"use client";

import { CircleHelp } from "lucide-react";
import { useState } from "react";
import { DIALOG_CONTENT_CLASS } from "@/app/constants";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface WelcomeDialogProps {
  open: boolean;
  onOpenChange: (_open: boolean) => void;
}

const WelcomeContent = ({ open, onOpenChange }: WelcomeDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={DIALOG_CONTENT_CLASS}
        aria-describedby="welcome-dialog-content"
        aria-description="Welcome dialog content"
      >
        <DialogHeader className="text-center sm:text-center">
          <DialogTitle className="text-2xl sm:text-3xl font-bold mb-4">
            The Baguashan Challenge
          </DialogTitle>
          <span className="text-muted-foreground mb-6 block text-base sm:text-lg leading-relaxed">
            Welcome to our game! This challenge is complete when you get to the
            correct location... but which one is it? Select a location, then
            follow the instructions.
          </span>
        </DialogHeader>
        <Button
          onClick={() => onOpenChange(false)}
          className="w-full py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
        >
          Let&apos;s play!
        </Button>
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
