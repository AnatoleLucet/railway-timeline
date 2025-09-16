type Bounds = [min: number, max: number];

export const math = {
  /**
   * Clamp a number between bounds.
   */
  clamp: (value: number, bounds: Bounds) => {
    return Math.min(bounds[1], Math.max(bounds[0], value));
  },
};
