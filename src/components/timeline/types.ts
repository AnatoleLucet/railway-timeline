import type { TimeRange } from "../../lib/time";

export type TimelineCtx = {
  /** Ref to the timeline container element */
  elem: React.RefObject<HTMLElement | null>;

  /** The scrollable range of the timeline */
  range: TimeRange;

  /** Factor of the zoom. */
  zoomFactor: number;

  /** How far are we from the range.start in pixels. */
  scrollOffset: number;

  /** Configuration options for the timeline */
  config: TimelineConfig;

  update: (updater: (ctx: TimelineCtx) => TimelineCtx) => void;
};

export type TimelineConfig = {
  /**
   * How many pixels represent 1 day at zoom level 1.
   * @default 100
   */
  pixelsPerDay: number;

  /**
   * Sensitivity of the zoom when using the mouse wheel or pinch gesture.
   * @default 100
   */
  zoomSensitivity: number;
};

export type TimelineRef = TimelineCtx & {
  /** Scroll the timeline left or right by a given number of pixels. */
  scroll: (delta: number) => void;

  /** Zoom the timeline in or out relative to a focal point (e.g. mouse position). */
  zoom: (delta: number, focalOffset: number) => void;
};

export type TimelineViewport = {
  height: number;
  width: number;
  top: number;
  left: number;
};
