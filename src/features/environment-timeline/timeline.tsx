import { Timeline } from "../../components/timeline";
import { TimelineBackground } from "./background";
import { Service } from "./service";
import { Deployment } from "./deployment";
import { Sidebar } from "./sidebar";

const Services = () => {
  return (
    <div className="my-4">
      <Service name="Service A">
        <Deployment
          status="active"
          range={{
            start: new Date("2023-01-04"),
            end: new Date("2023-01-07"),
          }}
        >
          Item 1
        </Deployment>

        <Deployment
          status="deploying"
          range={{
            start: new Date("2023-01-09"),
            end: new Date("2023-01-16"),
          }}
        >
          Item 2
        </Deployment>

        <Deployment
          status="completed"
          range={{
            start: new Date("2023-02-01"),
            end: new Date("2023-02-10"),
          }}
        >
          Item 5
        </Deployment>
      </Service>

      <Service name="Service B">
        <Deployment
          status="failed"
          range={{
            start: new Date("2023-01-03"),
            end: new Date("2023-01-05"),
          }}
        >
          Item 3
        </Deployment>

        <Deployment
          status="pending"
          range={{
            start: new Date("2023-01-08"),
            end: new Date("2023-01-13"),
          }}
        >
          Item 4
        </Deployment>

        <Deployment
          status="sleeping"
          range={{
            start: new Date("2023-03-01"),
            end: new Date("2023-03-20"),
          }}
        >
          Item 6
        </Deployment>
      </Service>
    </div>
  );
};

export const EnvironmentTimeline = () => {
  const timeline = Timeline.use();

  const range = {
    start: new Date("2000-01-01"),
    end: new Date("2024-04-17"),
  };

  return (
    <div className="p-4">
      <button onClick={() => timeline.current?.scroll(100)}>
        scroll right
      </button>
      <br />
      <button onClick={() => timeline.current?.scroll(-100)}>
        scroll left
      </button>

      <div className="h-[600px] w-full bg-background-secondary rounded-xl border border-gray-200 flex">
        <Sidebar />

        <Timeline.Root
          ref={timeline}
          options={{ range }}
          className="w-full h-full"
        >
          <TimelineBackground />
          <Services />
        </Timeline.Root>
      </div>
    </div>
  );
};
