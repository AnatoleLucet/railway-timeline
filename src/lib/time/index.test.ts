import { describe, expect, it } from "vitest";
import { time } from ".";

describe("time", () => {
  describe("duration", () => {
    it("calculates the duration of a time range in milliseconds", () => {
      const start = new Date("2023-01-01T00:00:00Z");
      const end = new Date("2023-01-01T01:00:00Z");
      const range = { start, end };

      expect(time.duration(range)).toBe(3600000);
    });

    it("handles negative durations", () => {
      const start = new Date("2023-01-01T01:00:00Z");
      const end = new Date("2023-01-01T00:00:00Z");
      const range = { start, end };

      expect(time.duration(range)).toBe(-3600000);
    });
  });

  describe("took", () => {
    it("returns a human-readable string representing the time taken between two dates", () => {
      const start = new Date("2023-01-01T00:00:00Z");
      const end = new Date("2023-01-01T02:00:00Z");

      expect(time.took(start, end)).toBe("Took 2 hours");
    });

    it("handles short durations", () => {
      const start = new Date("2023-01-01T00:00:00Z");
      const end = new Date("2023-01-01T00:00:05Z");

      expect(time.took(start, end)).toBe("Took a few seconds");
    });
  });

  describe("tessellate", () => {
    it("breaks a time range into non-overlapping smaller ranges of the given unit", () => {
      const start = new Date("2023-01-01T00:00:00Z");
      const end = new Date("2023-01-03T23:59:59.999Z");
      const range = { start, end };

      const result = time.tessellate("day", range);

      expect(result).toHaveLength(3);
      expect(result[0]).toEqual({
        start: new Date("2023-01-01T00:00:00Z"),
        end: new Date("2023-01-01T23:59:59.999Z"),
      });
      expect(result[1]).toEqual({
        start: new Date("2023-01-02T00:00:00Z"),
        end: new Date("2023-01-02T23:59:59.999Z"),
      });
      expect(result[2]).toEqual({
        start: new Date("2023-01-03T00:00:00Z"),
        end: new Date("2023-01-03T23:59:59.999Z"),
      });
    });

    it("handles ranges that do not align perfectly with the unit boundaries", () => {
      const start = new Date("2023-01-01T12:00:00Z");
      const end = new Date("2023-01-03T15:30:00Z");
      const range = { start, end };

      const result = time.tessellate("day", range);

      expect(result).toHaveLength(3);
      expect(result[0]).toEqual({
        start: new Date("2023-01-01T12:00:00Z"),
        end: new Date("2023-01-02T11:59:59.999Z"),
      });
      expect(result[1]).toEqual({
        start: new Date("2023-01-02T12:00:00Z"),
        end: new Date("2023-01-03T11:59:59.999Z"),
      });
      expect(result[2]).toEqual({
        start: new Date("2023-01-03T12:00:00Z"),
        end: new Date("2023-01-03T15:30:00Z"),
      });
    });
  });
});
