import { createServerFn } from "@tanstack/react-start";
import { railway } from "../../lib/railway-client";

const getProjectsQuery = railway.graphql(/* GraphQL */ `
  query projects {
    projects {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`);

export const getProjects = createServerFn()
  .validator((data: { apiKey: string }) => data)
  .handler(async ({ data }) => {
    const res = await railway
      .client(data.apiKey)
      .query(getProjectsQuery, {})
      .toPromise();

    if (!res.data) {
      throw new Error("Failed to fetch projects", { cause: res.error });
    }

    return res.data.projects.edges.map((edge) => edge.node);
  });
export type GetProjectsParams = Parameters<typeof getProjects>[0]["data"];
export type GetProjectsResult = Awaited<ReturnType<typeof getProjects>>;

const getProjectQuery = railway.graphql(/* GraphQL */ `
  query project($projectId: String!) {
    project(id: $projectId) {
      id
      name

      services {
        edges {
          node {
            id
            name
            createdAt
            deletedAt
          }
        }
      }
    }
  }
`);

export const getProject = createServerFn()
  .validator((data: { apiKey: string; projectId: string }) => data)
  .handler(async ({ data }) => {
    const res = await railway
      .client(data.apiKey)
      .query(getProjectQuery, { projectId: data.projectId })
      .toPromise();

    if (!res.data) {
      throw new Error("Failed to fetch project", { cause: res.error });
    }

    return res.data.project;
  });
export type GetProjectParams = Parameters<typeof getProject>[0]["data"];
export type GetProjectResult = Awaited<ReturnType<typeof getProject>>;

const getEnvironmentsQuery = railway.graphql(/* GraphQL */ `
  query environments($projectId: String!) {
    environments(projectId: $projectId) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`);

export const getEnvironments = createServerFn()
  .validator((data: { apiKey: string; projectId: string }) => data)
  .handler(async ({ data }) => {
    const res = await railway
      .client(data.apiKey)
      .query(getEnvironmentsQuery, { projectId: data.projectId })
      .toPromise();

    if (!res.data) {
      throw new Error("Failed to fetch environments", { cause: res.error });
    }

    return res.data.environments.edges.map((edge) => edge.node);
  });
export type GetEnvironmentsParams = Parameters<
  typeof getEnvironments
>[0]["data"];
export type GetEnvironmentsResult = Awaited<ReturnType<typeof getEnvironments>>;

const getEnvironmentQuery = railway.graphql(/* GraphQL */ `
  query environment($environmentId: String!) {
    environment(id: $environmentId) {
      id
      name
      createdAt
      deletedAt
    }
  }
`);
export const getEnvironment = createServerFn()
  .validator((data: { apiKey: string; environmentId: string }) => data)
  .handler(async ({ data }) => {
    const res = await railway
      .client(data.apiKey)
      .query(getEnvironmentQuery, { environmentId: data.environmentId })
      .toPromise();

    if (!res.data) {
      throw new Error("Failed to fetch environment", { cause: res.error });
    }

    return res.data.environment;
  });
export type GetEnvironmentParams = Parameters<typeof getEnvironment>[0]["data"];
export type GetEnvironmentResult = Awaited<ReturnType<typeof getEnvironment>>;

const getDeploymentsQuery = railway.graphql(/* GraphQL */ `
  query deployments(
    $serviceId: String
    $environmentId: String
    $after: String
    $before: String
  ) {
    deployments(
      after: $after
      before: $before
      input: { serviceId: $serviceId, environmentId: $environmentId }
    ) {
      edges {
        node {
          id
          status
          createdAt
          statusUpdatedAt
        }
      }
    }
  }
`);

export const getDeployments = createServerFn()
  .validator(
    (data: {
      apiKey: string;
      serviceId?: string;
      environmentId?: string;
      after?: string;
      before?: string;
    }) => data,
  )
  .handler(async ({ data }) => {
    const res = await railway
      .client(data.apiKey)
      .query(getDeploymentsQuery, {
        serviceId: data.serviceId,
        environmentId: data.environmentId,
        after: data.after,
        before: data.before,
      })
      .toPromise();

    if (!res.data) {
      throw new Error("Failed to fetch deployments", { cause: res.error });
    }

    return res.data.deployments.edges.map((edge) => edge.node);
  });
export type GetDeploymentsParams = Parameters<typeof getDeployments>[0]["data"];
export type GetDeploymentsResult = Awaited<ReturnType<typeof getDeployments>>;

const getDeploymentEventsQuery = railway.graphql(/* GraphQL */ `
  query deploymentEvents($deploymentId: String!) {
    deploymentEvents(id: $deploymentId) {
      edges {
        node {
          id
          step
          createdAt
          completedAt
        }
      }
    }
  }
`);

export const getDeploymentEvents = createServerFn()
  .validator((data: { apiKey: string; deploymentId: string }) => data)
  .handler(async ({ data }) => {
    const res = await railway
      .client(data.apiKey)
      .query(getDeploymentEventsQuery, { deploymentId: data.deploymentId })
      .toPromise();

    if (!res.data) {
      throw new Error("Failed to fetch deployment events", {
        cause: res.error,
      });
    }

    return res.data.deploymentEvents.edges.map((edge) => edge.node);
  });
export type GetDeploymentEventsParams = Parameters<
  typeof getDeploymentEvents
>[0]["data"];
export type GetDeploymentEventsResult = Awaited<
  ReturnType<typeof getDeploymentEvents>
>;
