import { beforeEach, describe, expect, it } from "vitest";
import { TimelineCtx } from "./types";
import { cull, scale } from "./lib";

describe("timeline lib", () => {
  let ctx: TimelineCtx;

  beforeEach(() => {
    ctx = {
      elem: { current: null },

      range: {
        start: new Date("2023-01-01T00:00:00Z"),
        end: new Date("2023-01-02T00:00:00Z"),
      },

      scrollOffset: 0,
      zoomFactor: 1,

      config: {
        pixelsPerDay: 100,
        zoomSensitivity: 100,
      },

      update: () => {},
    };
  });

  describe("scale", () => {
    describe("msWidth", () => {
      it("calculates the width in pixels for a duration in milliseconds", () => {
        ctx.config.pixelsPerDay = 100;
        expect(scale.msWidth(ctx).toFixed(10)).toBe("0.0000011574");

        ctx.config.pixelsPerDay = 200;
        expect(scale.msWidth(ctx).toFixed(10)).toBe("0.0000023148");

        ctx.config.pixelsPerDay = 50;
        expect(scale.msWidth(ctx).toFixed(10)).toBe("0.0000005787");
      });

      it("handles zoom factor", () => {
        ctx.config.pixelsPerDay = 100;
        ctx.zoomFactor = 2;
        expect(scale.msWidth(ctx).toFixed(10)).toBe("0.0000023148");

        ctx.zoomFactor = 0.5;
        expect(scale.msWidth(ctx).toFixed(10)).toBe("0.0000005787");
      });
    });

    describe("dayWidth", () => {
      it("calculates the width in pixels for one day", () => {
        expect(scale.dayWidth(ctx)).toBe(100);

        ctx.zoomFactor = 2;
        expect(scale.dayWidth(ctx)).toBe(200);

        ctx.zoomFactor = 0.5;
        expect(scale.dayWidth(ctx)).toBe(50);
      });
    });

    describe("rangeWidth", () => {
      it("calculates the width in pixels for a time range", () => {
        ctx.config.pixelsPerDay = 100;
        expect(scale.rangeWidth(ctx, ctx.range)).toBe(100);

        ctx.range.end = new Date("2023-01-03T00:00:00Z");
        expect(scale.rangeWidth(ctx, ctx.range)).toBe(200);

        ctx.range.start = new Date("2023-01-01T12:00:00Z");
        expect(scale.rangeWidth(ctx, ctx.range)).toBe(150);
      });

      it("handles zoom factor", () => {
        ctx.config.pixelsPerDay = 100;
        ctx.zoomFactor = 2;
        expect(scale.rangeWidth(ctx, ctx.range)).toBe(200);

        ctx.zoomFactor = 0.5;
        expect(scale.rangeWidth(ctx, ctx.range)).toBe(50);
      });
    });
  });

  describe("cull", () => {
    describe("isVisible", () => {
      it("determines if a time range is visible within the current viewport", () => {
        const viewport = {
          width: 100,
          height: 100,
          top: 0,
          left: 0,
        };

        // fully inside
        let range = {
          start: new Date("2023-01-01T06:00:00Z"),
          end: new Date("2023-01-01T18:00:00Z"),
        };
        expect(cull.isVisible(ctx, range, viewport)).toBe(true);

        // partially overlapping on the left
        range = {
          start: new Date("2022-12-31T18:00:00Z"),
          end: new Date("2023-01-01T06:00:00Z"),
        };
        expect(cull.isVisible(ctx, range, viewport)).toBe(true);

        // partially overlapping on the right
        range = {
          start: new Date("2023-01-01T18:00:00Z"),
          end: new Date("2023-01-02T06:00:00Z"),
        };
        expect(cull.isVisible(ctx, range, viewport)).toBe(true);

        // fully outside on the left
        range = {
          start: new Date("2022-12-31T00:00:00Z"),
          end: new Date("2022-12-31T23:59:59Z"),
        };
        expect(cull.isVisible(ctx, range, viewport)).toBe(false);

        // fully outside on the right
        range = {
          start: new Date("2023-01-02T00:00:01Z"),
          end: new Date("2023-01-03T00:00:00Z"),
        };
        expect(cull.isVisible(ctx, range, viewport)).toBe(false);
      });
    });

    describe("visibleRange", () => {
      it("should return the portion of the range that is visible within the viewport", () => {
        const viewport = {
          width: 100,
          height: 100,
          top: 0,
          left: 0,
        };

        // full range visible
        let range = cull.visibleRange(ctx, ctx.range, viewport);
        expect(range).toEqual({
          start: new Date("2023-01-01T00:00:00Z"),
          end: new Date("2023-01-02T00:00:00Z"),
        });

        // scrolled right by 50 pixels
        ctx.scrollOffset = 50;
        range = cull.visibleRange(ctx, ctx.range, viewport);
        expect(range).toEqual({
          start: new Date("2023-01-01T12:00:00Z"),
          end: new Date("2023-01-02T00:00:00Z"),
        });

        // zoomed in to 200 pixels per day
        ctx.scrollOffset = 0;
        ctx.config.pixelsPerDay = 200;
        range = cull.visibleRange(ctx, ctx.range, viewport);
        expect(range).toEqual({
          start: new Date("2023-01-01T00:00:00Z"),
          end: new Date("2023-01-01T12:00:00Z"),
        });
      });
    });
  });

  describe.todo("zoom");

  describe.todo("scroll");
});
