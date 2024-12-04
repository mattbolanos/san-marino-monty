"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Clock } from "lucide-react";
import { useEffect } from "react";

interface TimerProps {
  timeRemaining: number;
  setTimeRemaining: (_time: number) => void;
}

export function Timer({ timeRemaining, setTimeRemaining }: TimerProps) {
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(Math.max(0, timeRemaining - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [timeRemaining, setTimeRemaining]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <Alert variant="destructive">
      <Clock className="h-4 w-4" />
      <AlertTitle>Time Remaining</AlertTitle>
      <AlertDescription>
        {formatTime(timeRemaining)} to reach the correct tower!
      </AlertDescription>
    </Alert>
  );
}
