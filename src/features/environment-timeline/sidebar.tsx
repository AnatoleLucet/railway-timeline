import type React from "react";
import { useProject } from "./hooks";

const SidebarIem = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="h-14 py-2 pr-4 flex items-center justify-end border-b border-gray-200 last:border-0">
      {children}
    </div>
  );
};

type Props = {
  apiKey: string;
  projectId: string;
};

export const Sidebar = ({ apiKey, projectId }: Props) => {
  const project = useProject({ apiKey, projectId });

  return (
    <ul className="h-full w-48 pt-14 border-r border-gray-200">
      {project.data?.services.edges.map(({ node: service }) => (
        <SidebarIem key={service.id}>{service.name}</SidebarIem>
      ))}
    </ul>
  );
};
