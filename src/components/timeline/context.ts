import React from "react";
import type { TimelineCtx } from "./types";

export const TimelineContext = React.createContext<TimelineCtx | undefined>(
  undefined,
);

export const useTimelineContext = () => {
  const ctx = React.useContext(TimelineContext);
  if (!ctx) {
    throw new Error(
      "useCtx must be used within a TimelineProvider. Did you forget to wrap your component in a <Timeline.Root>?",
    );
  }

  return ctx;
};
