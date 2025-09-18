import { useQuery } from "@tanstack/react-query";
import {
  getDeploymentEvents,
  GetDeploymentEventsParams,
  getDeployments,
  GetDeploymentsParams,
  getEnvironment,
  GetEnvironmentParams,
  getEnvironments,
  GetEnvironmentsParams,
  getProject,
  GetProjectParams,
  getProjects,
  GetProjectsParams,
} from "./api";

export const useProjects = (params: GetProjectsParams) => {
  return useQuery({
    queryKey: ["projects", params],
    queryFn: () => getProjects({ data: params }),
    enabled: !!params.apiKey,
  });
};

export const useProject = (params: GetProjectParams) => {
  return useQuery({
    queryKey: ["project", params],
    queryFn: () => getProject({ data: params }),
    enabled: !!params.apiKey && !!params.projectId,
  });
};

export const useEnvironments = (params: GetEnvironmentsParams) => {
  return useQuery({
    queryKey: ["environments", params],
    queryFn: () => getEnvironments({ data: params }),
    enabled: !!params.apiKey && !!params.projectId,
  });
};

export const useEnvironment = (params: GetEnvironmentParams) => {
  return useQuery({
    queryKey: ["environment", params],
    queryFn: () => getEnvironment({ data: params }),
    enabled: !!params.apiKey && !!params.environmentId,
  });
};

export const useDeployments = (params: GetDeploymentsParams) => {
  return useQuery({
    queryKey: ["deployments", params],
    queryFn: () => getDeployments({ data: params }),
    enabled: !!params.apiKey && (!!params.serviceId || !!params.environmentId),
  });
};

export const useDeploymentEvents = (params: GetDeploymentEventsParams) => {
  return useQuery({
    queryKey: ["deployment-events", params],
    queryFn: () => getDeploymentEvents({ data: params }),
    enabled: !!params.apiKey && !!params.deploymentId,
  });
};
