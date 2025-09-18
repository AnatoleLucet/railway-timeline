import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(utc);
dayjs.extend(duration);
dayjs.extend(relativeTime);

export type TimeRange = {
  start: Date;
  end: Date;
};

export const time = {
  /**
   * Returns the duration of a time range in milliseconds.
   */
  duration: (range: TimeRange) => {
    return range.end.getTime() - range.start.getTime();
  },

  /**
   * Returns a human-readable string representing the time taken between two dates.
   */
  took(start: Date, end: Date) {
    const diff = dayjs(end).diff(dayjs(start));
    return `Took ${dayjs.duration(diff).humanize()}`;
  },

  /**
   * Breaks a time range into non-overlapping smaller ranges of the given unit (days, weeks, months, etc).
   */
  tessellate: (unit: dayjs.ManipulateType, range: TimeRange): TimeRange[] => {
    const startUtc = dayjs.utc(range.start);
    const endUtc = dayjs.utc(range.end);

    const diff = endUtc.diff(startUtc, unit) + 1; // +1 to include the end unit

    return Array.from({ length: diff }).map((_, i) => {
      const start = dayjs(startUtc).add(i, unit);
      const end = start.add(1, unit).subtract(1, "millisecond");

      return {
        // make sure we don't go outside the original range
        start: new Date(Math.max(startUtc.valueOf(), start.valueOf())),
        end: new Date(Math.min(endUtc.valueOf(), end.valueOf())),
      };
    });
  },
};
