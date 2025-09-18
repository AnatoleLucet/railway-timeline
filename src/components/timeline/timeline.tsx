import React, { useEffect, useLayoutEffect } from "react";
import clsx from "clsx";

import { TimelineContext, useTimelineContext } from "./context";
import {
  useTimeline,
  useTimelineDragging,
  useTimelineZooming,
  useTimelineActions,
} from "./hooks";
import { type TimeRange } from "../../lib/time";
import {
  type TimelineConfig,
  type TimelineCtx,
  type TimelineRef,
} from "./types";
import { cull, scale, zoom } from "./lib";

type ItemProps = {
  range: TimeRange;

  className?: string;
  children?: React.ReactNode;
};

type RowProps = {
  className?: string;
  children?: React.ReactNode;
};

type RootProps = {
  options: Partial<TimelineConfig> & {
    /** The scrollable range of the timeline */
    range: TimeRange;

    /** Initial viewport range, defaults to the full range */
    initialViewport?: {
      start: Date;
      end: Date;
    };
  };

  className?: string;
  children?: React.ReactNode;
};

const Item = React.forwardRef<HTMLDivElement, ItemProps>(
  ({ range, className, children }, ref) => {
    const ctx = useTimelineContext();

    if (range.end <= range.start) {
      console.warn("Timeline.Item: range.end must be after range.start");
      return null;
    }

    const viewport = ctx.elem.current?.getBoundingClientRect();

    // avoid rendering items that are out of view
    const isVisible = cull.isVisible(ctx, range, viewport);
    if (!isVisible) return null;

    const width = scale.rangeWidth(ctx, range);
    const msOffset = range.start.getTime() - ctx.range.start.getTime();
    const offset = msOffset * scale.msWidth(ctx) - ctx.scrollOffset;

    return (
      <div
        ref={ref}
        style={{ left: offset, width: width }}
        className={clsx("pointer-events-auto absolute top-0 h-full", className)}
      >
        {children}
      </div>
    );
  },
);

const Row = React.forwardRef<HTMLDivElement, RowProps>(
  ({ className, children }, ref) => (
    <div ref={ref} className={clsx("relative h-10 w-full", className)}>
      {children}
    </div>
  ),
);

const Root = React.forwardRef<TimelineRef, RootProps>(
  ({ options, className, children }, forwardRef) => {
    const ref = React.useRef<HTMLDivElement>(null);

    const [ctx, setCtx] = React.useState<TimelineCtx>({
      elem: ref,

      range: options.range,

      zoomFactor: 1,
      scrollOffset: 0,

      config: {
        pixelsPerDay: options.pixelsPerDay ?? 100,
        zoomSensitivity: options.zoomSensitivity ?? 100,
      },

      update: (updater) => setCtx((c) => updater(c)),
    });

    const actions = useTimelineActions(ctx);
    React.useImperativeHandle(forwardRef, () => ({
      ...ctx,
      ...actions,
    }));

    // update context when options change
    useEffect(() => {
      setCtx((c) => ({
        ...c,
        range: options.range,
        config: {
          pixelsPerDay: options.pixelsPerDay ?? c.config.pixelsPerDay,
          zoomSensitivity: options.zoomSensitivity ?? c.config.zoomSensitivity,
        },
      }));
    }, [
      options.range.start.getTime(),
      options.range.end.getTime(),
      options.pixelsPerDay,
      options.zoomSensitivity,
    ]);

    // set initial viewport
    useLayoutEffect(() => {
      actions.jumpTo(options.initialViewport ?? options.range);
    }, []);

    return (
      <TimelineContext.Provider value={ctx}>
        <RootImpl ref={ref} className={className}>
          {children}
        </RootImpl>
      </TimelineContext.Provider>
    );
  },
);

const RootImpl = React.forwardRef<
  HTMLDivElement,
  { className?: string; children: React.ReactNode }
>(({ className, children }, ref) => {
  const ctx = useTimelineContext();

  useTimelineDragging(ctx);
  useTimelineZooming(ctx);

  return (
    <div
      ref={ref}
      className={clsx("overflow-hidden touch-none relative", className)}
    >
      {children}
    </div>
  );
});

export const Timeline = {
  use: useTimeline,
  useContext: useTimelineContext,

  Item,
  Row,
  Root,
};
