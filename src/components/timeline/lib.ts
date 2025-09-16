import { math } from "../../lib/math";
import { time, type TimeRange } from "../../lib/time";
import type { TimelineCtx, TimelineViewport } from "./types";

/** Related to scaling time to pixels and vice versa. */
export const scale = {
  /** How many pixels represent 1 millisecond at a given zoom level. */
  msWidth: (ctx: TimelineCtx, zoom = ctx.zoomFactor) => {
    return (ctx.config.pixelsPerDay / (1000 * 60 * 60 * 24)) * zoom;
  },
  /** Width of one day in pixels at a given zoom level. */
  dayWidth: (ctx: TimelineCtx, zoom = ctx.zoomFactor) => {
    return ctx.config.pixelsPerDay * zoom;
  },
  /** Width of a given time range in pixels at a given zoom level. */
  rangeWidth: (ctx: TimelineCtx, range: TimeRange, zoom = ctx.zoomFactor) => {
    return time.duration(range) * scale.msWidth(ctx, zoom);
  },
};

/** Related to culling items that are out of view. */
export const cull = {
  /** Whether a given time range is visible in the current viewport. */
  isVisible: (
    ctx: TimelineCtx,
    range: TimeRange,
    viewport?: TimelineViewport,
  ) => {
    if (!viewport) return true; // if we don't have a viewport, assume everything is visible

    const msWidth = scale.msWidth(ctx);
    const itemStart =
      (range.start.getTime() - ctx.range.start.getTime()) * msWidth;
    const itemEnd = (range.end.getTime() - ctx.range.start.getTime()) * msWidth;

    const viewStart = ctx.scrollOffset;
    const viewEnd = ctx.scrollOffset + viewport.width;

    return itemEnd >= viewStart && itemStart <= viewEnd;
  },

  /** Returns the visible portion of a given time range in the current viewport. */
  visibleRange: (
    ctx: TimelineCtx,
    range: TimeRange,
    viewport?: TimelineViewport,
  ) => {
    if (!viewport || !cull.isVisible(ctx, range, viewport)) {
      return null;
    }

    const msWidth = scale.msWidth(ctx);
    const itemStart =
      (range.start.getTime() - ctx.range.start.getTime()) * msWidth;
    const itemEnd = (range.end.getTime() - ctx.range.start.getTime()) * msWidth;

    const viewStart = ctx.scrollOffset;
    const viewEnd = ctx.scrollOffset + viewport.width;

    const visibleStart = Math.max(itemStart, viewStart);
    const visibleEnd = Math.min(itemEnd, viewEnd);

    const visibleRangeStart =
      ctx.range.start.getTime() + visibleStart / msWidth;
    const visibleRangeEnd = ctx.range.start.getTime() + visibleEnd / msWidth;

    return {
      start: new Date(visibleRangeStart),
      end: new Date(visibleRangeEnd),
    };
  },
};

/** Related to zooming the timeline in and out. */
export const zoom = {
  by: (
    ctx: TimelineCtx,
    delta: number,
    focalOffset: number,
    viewport: TimelineViewport,
  ) => {
    const zoomDelta = Math.exp(delta * -1);
    const zoomFactor = zoom.clamp(ctx, ctx.zoomFactor * zoomDelta, viewport);

    // by how much the content is beeing zommed in/out (1 = no change, 2 = double size, 0.5 = half size)
    const scaleFactor =
      scale.msWidth(ctx, zoomFactor) / scale.msWidth(ctx, ctx.zoomFactor);

    // calculate new scroll offset by ensuring the focal point stays in the same position
    const oldOffset = ctx.scrollOffset + focalOffset;
    const newOffset = oldOffset * scaleFactor - focalOffset;

    const scrollOffset = scroll.clamp(
      { ...ctx, zoomFactor },
      newOffset,
      viewport,
    );

    return {
      zoomFactor,
      scrollOffset,
    };
  },
  clamp: (ctx: TimelineCtx, zoom: number, viewport: TimelineViewport) => {
    const baseContentWidth = scale.rangeWidth(ctx, ctx.range, 1);
    const minZoom = viewport.width / baseContentWidth;

    return math.clamp(zoom, [minZoom, Infinity]); // TODO: max zoom maybe?
  },
};

/** Related to scrolling the timeline left and right. */
export const scroll = {
  by: (ctx: TimelineCtx, delta: number, viewport: TimelineViewport) => {
    return scroll.clamp(ctx, ctx.scrollOffset + delta, viewport);
  },
  clamp: (ctx: TimelineCtx, scroll: number, viewport: TimelineViewport) => {
    const contentWidth = scale.rangeWidth(ctx, ctx.range, ctx.zoomFactor);
    const maxScroll = Math.max(0, contentWidth - viewport.width);

    return math.clamp(scroll, [0, maxScroll]);
  },
};
