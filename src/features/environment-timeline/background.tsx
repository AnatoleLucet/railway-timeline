import React from "react";
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

type UnitRulerLabelProps = {
  range: TimeRange;
  format: string;

  classNames?: string;
};

type UnitRulerDividerProps = {
  range: TimeRange;
  splits?: number;

  classNames?: string;
};

const scales = {
  minutes: {
    minDayWidth: 60000,
    labelFormat: "HH:mm",
  },
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

const UnitRulerLabel = ({ range, format, classNames }: UnitRulerLabelProps) => {
  return (
    <Timeline.Item range={range}>
      <div
        className={clsx(
          "absolute top-0 left-0 h-full w-full flex items-center justify-center text-xs text-gray-600 font-bold",
          classNames,
        )}
      >
        {dayjs(range.start).format(format)}
      </div>
    </Timeline.Item>
  );
};

const UnitRulerDivider = ({
  range,
  splits = 0,
  classNames,
}: UnitRulerDividerProps) => {
  const dividerSplits = Array.from({ length: splits }).map((_, i) => (
    <div
      key={i}
      className="absolute h-full w-[1px] bg-[linear-gradient(var(--color-gray-200)_33%,rgba(255,255,255,0)_0%)] bg-left bg-size-[1px_10px] bg-repeat-y"
      style={{ left: `${((i + 1) / (splits + 1)) * 100}%` }}
    />
  ));

  return (
    <Timeline.Item range={range}>
      <div
        className={clsx(
          "absolute top-10 left-0 h-full w-full border-r border-gray-200",
          classNames,
        )}
      >
        {dividerSplits}
      </div>
    </Timeline.Item>
  );
};

const UnitRuler = ({
  unit,
  range,
  format,
  splits,
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

  return (
    <>
      <Timeline.Row className="h-10">
        {segments.map((segment) => (
          <UnitRulerLabel
            key={segment.start.toISOString()}
            range={segment}
            format={format}
            classNames={classNames?.label}
          />
        ))}
      </Timeline.Row>

      {segments.map((segment) => (
        <UnitRulerDivider
          key={segment.start.toISOString()}
          range={segment}
          splits={splits}
          classNames={classNames?.line}
        />
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

  // TODO: impl a level-of-detail helper to make this cleaner
  if (dayWidth >= scales.minutes.minDayWidth) {
    return (
      <UnitRuler
        unit="minute"
        range={range}
        format={scales.minutes.labelFormat}
        splits={Math.max(
          dayWidth >= scales.minutes.minDayWidth * 5 ? 5 : 0,
          dayWidth >= scales.minutes.minDayWidth * 2 ? 1 : 0,
        )}
        classNames={{ label: "-translate-x-1/2" }}
      />
    );
  }

  if (dayWidth >= scales.hours.minDayWidth) {
    return (
      <UnitRuler
        unit="hour"
        range={range}
        format={scales.hours.labelFormat}
        splits={Math.max(
          dayWidth >= scales.hours.minDayWidth * 20 ? 29 : 0,
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
          dayWidth >= scales.months.minDayWidth * 5 ? 29 : 0,
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
