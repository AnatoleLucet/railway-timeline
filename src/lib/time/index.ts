import dayjs from "dayjs";

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
   * Breaks a time range into non-overlapping smaller ranges of the given unit (days, weeks, months, etc).
   */
  tessellate: (unit: dayjs.ManipulateType, range: TimeRange): TimeRange[] => {
    const diff = dayjs(range.end).diff(dayjs(range.start), unit) + 1; // +1 to include the end unit

    return Array.from({ length: diff }).map((_, i) => {
      const start = dayjs(range.start).add(i, unit);
      const end = start.endOf(unit);

      return {
        start: start.toDate(),
        end: end.toDate(),
      };
    });
  },
  // tessellate: (
  //   unit: dayjs.ManipulateType,
  //   range: TimeRange,
  //   step: number = 1,
  // ): TimeRange[] => {
  //   const start = dayjs(range.start);
  //   const end = dayjs(range.end);
  //
  //   const ranges: TimeRange[] = [];
  //   let current = start;
  //
  //   while (current.isBefore(end)) {
  //     const previous = ranges[ranges.length - 1];
  //
  //     const rangeStart = current.toDate();
  //     const rangeEnd = current.add(step, unit).toDate();
  //
  //     // avoid infinite loops in case of misconfiguration
  //     if (rangeStart === previous?.start && rangeEnd === previous?.end) {
  //       break;
  //     }
  //
  //     ranges.push({ start: rangeStart, end: rangeEnd });
  //     current = current.add(step, unit);
  //   }
  //
  //   return ranges;
  // },
};
