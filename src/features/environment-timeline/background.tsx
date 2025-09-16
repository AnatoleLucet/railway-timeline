import React, { useMemo } from "react";
import dayjs from "dayjs";
import { time, type TimeRange } from "../../lib/time";
import { Timeline, cull, scale } from "../../components/timeline";
import clsx from "clsx";

type UnitRulerProps = {
  unit: dayjs.ManipulateType;
  range: TimeRange;
  format: string;
  splits?: number;

  classNames?: {
    label?: string;
    line?: string;
  };
};

const scales = {
  hours: {
    minDayWidth: 1200,
    labelFormat: "HH:mm",
  },
  days: {
    minDayWidth: 90,
    labelFormat: "ddd D",
  },
  months: {
    minDayWidth: 3,
    labelFormat: "MMM 'YY",
  },
  years: {
    minDayWidth: 0,
    labelFormat: "YYYY",
  },
};

const UnitRuler = ({
  unit,
  range,
  format,
  splits = 0,
  classNames,
}: UnitRulerProps) => {
  // adjust the visible range to full units to make sure the graduation is
  // aligned with a fixed start/end and not the range's relative start/end
  const visibleRange = React.useMemo(
    () => ({
      start: dayjs(range.start).startOf(unit).toDate(),
      end: dayjs(range.end).endOf(unit).toDate(),
    }),
    [range],
  );

  const segments = time.tessellate(unit, visibleRange);

  // TODO: splits into sub components
  return (
    <>
      <Timeline.Row className="h-10">
        {segments.map((segment) => (
          <Timeline.Item key={segment.start.toISOString()} range={segment}>
            <div
              className={clsx(
                "absolute top-0 left-0 h-full w-full flex items-center justify-center text-xs text-gray-600 font-bold",
                classNames?.label,
              )}
            >
              {dayjs(segment.start).format(format)}
            </div>
          </Timeline.Item>
        ))}
      </Timeline.Row>

      {segments.map((segment) => (
        <Timeline.Item key={segment.start.toISOString()} range={segment}>
          <div
            className={clsx(
              "absolute top-10 left-0 h-full w-full border-r border-gray-200",
              classNames?.line,
            )}
          >
            {Array.from({ length: splits }).map((_, i) => (
              <div
                key={i}
                className="absolute h-full w-[1px] bg-[linear-gradient(var(--color-gray-200)_33%,rgba(255,255,255,0)_0%)] bg-left bg-size-[1px_10px] bg-repeat-y"
                style={{ left: `${((i + 1) / (splits + 1)) * 100}%` }}
              />
            ))}
          </div>
        </Timeline.Item>
      ))}
    </>
  );
};

const Ruler = () => {
  const ctx = Timeline.useContext();

  const viewport = ctx.elem.current?.getBoundingClientRect();
  const range = cull.visibleRange(ctx, ctx.range, viewport);
  if (!range) return null;

  const dayWidth = scale.dayWidth(ctx);

  // TODO: impl a level of detail helper to make this cleaner
  if (dayWidth >= scales.hours.minDayWidth) {
    return (
      <UnitRuler
        unit="hour"
        range={range}
        format={scales.hours.labelFormat}
        splits={Math.max(
          dayWidth >= scales.hours.minDayWidth * 5 ? 3 : 0,
          dayWidth >= scales.hours.minDayWidth * 2 ? 1 : 0,
        )}
        classNames={{ label: "-translate-x-1/2" }}
      />
    );
  }

  if (dayWidth >= scales.days.minDayWidth) {
    return (
      <UnitRuler
        unit="day"
        range={range}
        format={scales.days.labelFormat}
        splits={Math.max(
          dayWidth >= scales.days.minDayWidth * 5 ? 23 : 0,
          dayWidth >= scales.days.minDayWidth * 2 ? 3 : 0,
        )}
      />
    );
  }

  if (dayWidth >= scales.months.minDayWidth) {
    return (
      <UnitRuler
        unit="month"
        range={range}
        format={scales.months.labelFormat}
        splits={Math.max(
          dayWidth >= scales.months.minDayWidth * 5 ? 29 : 0, // TODO: 29 is not always correct. checkout may 2019 for instance
          dayWidth >= scales.months.minDayWidth * 1.5 ? 3 : 0,
        )}
      />
    );
  }

  return (
    <UnitRuler
      unit="year"
      range={range}
      format={scales.years.labelFormat}
      splits={Math.max(
        dayWidth >= scales.months.minDayWidth * 0.3 ? 11 : 0,
        dayWidth >= scales.months.minDayWidth * 0.1 ? 3 : 0,
      )}
    />
  );
};

export const TimelineBackground = () => (
  <div aria-hidden className="pointer-events-none">
    <Ruler />
  </div>
);
