"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

interface TimerProps {
  timeRemaining: number;
  setTimeRemaining: (_time: number) => void;
  className?: string;
}

export function Timer({
  timeRemaining,
  setTimeRemaining,
  className,
}: TimerProps) {
  const [endTime] = useState(() => {
    const end = new Date();
    end.setSeconds(end.getSeconds() + timeRemaining);
    return end;
  });

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

  const formatEndTime = (date: Date) => {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    });
  };

  return (
    <div className={cn("w-fit mx-auto py-2", className)}>
      <Alert variant="destructive" className="py-1">
        <AlertDescription className="flex flex-col items-center py-0">
          <div className="flex items-center">
            <Clock className="h-6 w-6 mr-2" />
            <span className="font-bold text-lg">
              {formatTime(timeRemaining)}
            </span>
          </div>
          <div className="text-sm mt-1 text-primary">
            Ends at {formatEndTime(endTime)}
          </div>
        </AlertDescription>
      </Alert>
    </div>
  );
}
