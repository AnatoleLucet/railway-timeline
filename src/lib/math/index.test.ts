import { describe, expect, it } from "vitest";
import { math } from ".";

describe("math", () => {
  describe("clamp", () => {
    it("clamps a number within the given bounds", () => {
      const bounds: [number, number] = [0, 10];

      expect(math.clamp(5, bounds)).toBe(5);
      expect(math.clamp(-5, bounds)).toBe(0);
      expect(math.clamp(15, bounds)).toBe(10);
    });

    it("handles infinite bounds", () => {
      const bounds: [number, number] = [-Infinity, Infinity];

      expect(math.clamp(5, bounds)).toBe(5);
      expect(math.clamp(-1000, bounds)).toBe(-1000);
      expect(math.clamp(1000, bounds)).toBe(1000);
    });
  });
});
