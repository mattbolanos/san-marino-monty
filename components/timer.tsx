"use client";

import * as React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";

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
  const [endTime] = React.useState(() => {
    const end = new Date();
    end.setSeconds(end.getSeconds() + timeRemaining);
    return end;
  });

  React.useEffect(() => {
    let lastTick = Date.now();
    const interval = setInterval(() => {
      const now = Date.now();
      const delta = Math.floor((now - lastTick) / 1000);

      if (delta >= 1) {
        setTimeRemaining(Math.max(0, timeRemaining - delta));
        lastTick = now;
      }
    }, 100);

    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") {
        lastTick = Date.now();
      }
    });

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
