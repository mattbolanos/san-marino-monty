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
import { DIALOG_CONTENT_CLASS } from "@/app/constants";

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
        <DialogHeader>
          <DialogTitle className="sm:text-2xl text-lg font-bold sm:mb-4 mb-2">
            The San Marino Towers Challenge
          </DialogTitle>
          <span className="text-muted-foreground sm:mb-4 mb-2 block sm:text-base text-sm">
            Welcome to our game! This challenge is complete when you get to the
            correct tower... but which one is it? Select a tower, then follow
            the instructions
          </span>
        </DialogHeader>
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
