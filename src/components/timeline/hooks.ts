import React from "react";
import { useGesture, useWheel } from "@use-gesture/react";
import { scroll, zoom } from "./lib";
import type { TimelineCtx, TimelineRef } from "./types";

export const useTimeline = () => {
  return React.useRef<TimelineRef>(null);
};

export const useTimelineActions = (ctx: TimelineCtx) => {
  return {
    scroll: React.useCallback(
      (delta: number) => {
        const viewport = ctx.elem.current?.getBoundingClientRect();
        if (!viewport) return;

        ctx.update((c) => ({
          ...c,
          scrollOffset: scroll.by(c, delta, viewport),
        }));
      },
      [ctx.update],
    ),

    zoom: React.useCallback(
      (delta: number, focalOffset: number) => {
        const viewport = ctx.elem.current?.getBoundingClientRect();
        if (!viewport) return;

        ctx.update((c) => {
          const { zoomFactor, scrollOffset } = zoom.by(
            c,
            delta,
            focalOffset,
            viewport,
          );

          return {
            ...c,
            zoomFactor,
            scrollOffset,
          };
        });
      },
      [ctx.update],
    ),
  };
};

export const useTimelineDragging = (ctx: TimelineCtx) => {
  const actions = useTimelineActions(ctx);

  useGesture(
    {
      onDrag: ({ event, delta }) => {
        if (delta[0] === 0) return;
        event.preventDefault();

        actions.scroll(-delta[0]);
      },
      onWheel: ({ event, delta, pinching, ctrlKey }) => {
        if (pinching || ctrlKey || delta[0] === 0) return;
        event.preventDefault();

        actions.scroll(delta[0]);
      },
    },
    {
      target: ctx.elem,
      eventOptions: { passive: false },
    },
  );
};

export const useTimelineZooming = (ctx: TimelineCtx) => {
  const actions = useTimelineActions(ctx);

  useWheel(
    ({ event, delta, ctrlKey }) => {
      if (!ctx.elem.current || !ctrlKey || delta[1] === 0) return;
      event.preventDefault();

      const viewport = ctx.elem.current.getBoundingClientRect();

      const sensitivity = ctx.config.zoomSensitivity * 0.0001;
      const cursorX = event.clientX - viewport.left;

      actions.zoom(delta[1] * sensitivity, cursorX);
    },
    {
      target: ctx.elem,
      eventOptions: { passive: false },
    },
  );
};
