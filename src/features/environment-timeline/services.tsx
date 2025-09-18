import { Timeline } from "~/components/timeline";
import { useProject } from "./hooks";
import { Deployments } from "./deployments";

type ServicesProps = {
  apiKey: string;
  projectId: string;
  environmentId: string;
};

type ServiceProps = {
  apiKey: string;
  serviceId: string;
  environmentId: string;
};

const Service = ({ apiKey, serviceId, environmentId }: ServiceProps) => {
  return (
    <Timeline.Row className="h-14 py-2 border-b border-gray-200 last:border-0">
      <div className="h-full w-full relative">
        <Deployments
          apiKey={apiKey}
          serviceId={serviceId}
          environmentId={environmentId}
        />
      </div>
    </Timeline.Row>
  );
};

export const Services = ({
  apiKey,
  projectId,
  environmentId,
}: ServicesProps) => {
  const project = useProject({ apiKey, projectId });

  return (
    <div className="my-4">
      {project.data?.services.edges.map(({ node: service }) => (
        <Service
          key={service.id}
          apiKey={apiKey}
          serviceId={service.id}
          environmentId={environmentId}
        />
      ))}
    </div>
  );
};
