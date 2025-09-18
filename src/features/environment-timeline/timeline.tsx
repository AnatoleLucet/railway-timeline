import { Timeline } from "../../components/timeline";
import { TimelineBackground } from "./background";
import { Sidebar } from "./sidebar";
import clsx from "clsx";
import { TimelineForm, TimelineFormData } from "./form";
import React from "react";
import { Services } from "./services";
import dayjs from "dayjs";
import { useEnvironment } from "./hooks";

type EnvironmentTimelineProps = {
  className?: string;
};

type TimelineViewportProps = TimelineFormData;

const TimelineViewport = ({
  apiKey,
  projectId,
  environmentId,
}: TimelineViewportProps) => {
  const timeline = Timeline.use();

  const environment = useEnvironment({ apiKey, environmentId });

  const envCreatedAt =
    environment.data?.createdAt || dayjs().subtract(3, "day").toISOString();
  const envDeletedAt = environment.data?.deletedAt || dayjs().toISOString();

  const range = {
    start: new Date(envCreatedAt),
    end: new Date(envDeletedAt),
  };

  const initialViewport = {
    start: dayjs(range.end).subtract(1.5, "day").toDate(),
    end: range.end,
  };

  return (
    <div className="w-full h-full bg-background-secondary rounded-xl border border-gray-200 flex">
      <Sidebar apiKey={apiKey} projectId={projectId} />

      <Timeline.Root
        key={environment.data?.id} // reset timeline when environment changes to reset initial viewport etc
        ref={timeline}
        options={{
          range,
          initialViewport,
        }}
        className="w-full h-full"
      >
        <TimelineBackground />

        <Services
          apiKey={apiKey}
          projectId={projectId}
          environmentId={environmentId}
        />
      </Timeline.Root>
    </div>
  );
};

export const EnvironmentTimeline = ({
  className,
}: EnvironmentTimelineProps) => {
  const [formData, setFormData] = React.useState<TimelineFormData>({
    apiKey: "",
    projectId: "",
    environmentId: "",
  });

  return (
    <div className={clsx("h-full p-4 flex flex-col gap-4", className)}>
      <TimelineForm onChange={setFormData} />
      <TimelineViewport {...formData} />
    </div>
  );
};
