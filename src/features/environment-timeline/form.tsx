import { Primitive } from "~/components/primitive";
import { useQueryParam } from "~/hooks/use-query-param";
import React from "react";
import { useEnvironments, useProjects } from "./hooks";

export type TimelineFormData = {
  apiKey: string;
  projectId: string;
  environmentId: string;
};

type Props = {
  onChange?: (data: TimelineFormData) => void;
};

export const TimelineForm = ({ onChange }: Props) => {
  const [apiKey, setApiKey] = useQueryParam("apikey");
  const [projectId, setProjectId] = useQueryParam("projectid");
  const [environmentId, setEnvironmentId] = useQueryParam("environmentid");

  const projects = useProjects({ apiKey });
  const environments = useEnvironments({ apiKey, projectId });

  React.useEffect(() => {
    if (onChange) onChange({ apiKey, projectId, environmentId });
  }, [apiKey, projectId, environmentId]);

  // auto select first project if only one available
  React.useEffect(() => {
    if (projects.data?.length === 1 && !projectId) {
      setProjectId(projects.data[0].id);
    }
  }, [projects.data, projectId]);

  // auto select first environment if only one available
  React.useEffect(() => {
    if (environments.data?.length === 1 && !environmentId) {
      setEnvironmentId(environments.data[0].id);
    }
  }, [environments.data, environmentId]);

  return (
    <div className="flex items-center gap-2">
      <Primitive.InputText
        value={apiKey}
        onChange={(e) => {
          setApiKey(e.currentTarget.value);
          setProjectId("");
          setEnvironmentId("");
        }}
        placeholder="Api key"
        className="min-w-82"
      />

      <Primitive.Select.Root
        value={projectId}
        onChange={(e) => {
          setProjectId(e.currentTarget.value);
          setEnvironmentId("");
        }}
        className="min-w-42"
      >
        <Primitive.Select.Option value="">Project</Primitive.Select.Option>

        {projects.data?.map((project) => (
          <Primitive.Select.Option key={project.id} value={project.id}>
            {project.name}
          </Primitive.Select.Option>
        ))}
      </Primitive.Select.Root>

      <Primitive.Select.Root
        value={environmentId}
        onChange={(e) => setEnvironmentId(e.currentTarget.value)}
        className="min-w-42"
      >
        <Primitive.Select.Option value="">Environment</Primitive.Select.Option>

        {environments.data?.map((environment) => (
          <Primitive.Select.Option key={environment.id} value={environment.id}>
            {environment.name}
          </Primitive.Select.Option>
        ))}
      </Primitive.Select.Root>
    </div>
  );
};
