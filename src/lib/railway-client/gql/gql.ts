/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query projects {\n    projects {\n      edges {\n        node {\n          id\n          name\n        }\n      }\n    }\n  }\n": typeof types.ProjectsDocument,
    "\n  query project($projectId: String!) {\n    project(id: $projectId) {\n      id\n      name\n\n      services {\n        edges {\n          node {\n            id\n            name\n            createdAt\n            deletedAt\n          }\n        }\n      }\n    }\n  }\n": typeof types.ProjectDocument,
    "\n  query environments($projectId: String!) {\n    environments(projectId: $projectId) {\n      edges {\n        node {\n          id\n          name\n        }\n      }\n    }\n  }\n": typeof types.EnvironmentsDocument,
    "\n  query environment($environmentId: String!) {\n    environment(id: $environmentId) {\n      id\n      name\n      createdAt\n      deletedAt\n    }\n  }\n": typeof types.EnvironmentDocument,
    "\n  query deployments(\n    $serviceId: String\n    $environmentId: String\n    $after: String\n    $before: String\n  ) {\n    deployments(\n      after: $after\n      before: $before\n      input: { serviceId: $serviceId, environmentId: $environmentId }\n    ) {\n      edges {\n        node {\n          id\n          status\n          createdAt\n          statusUpdatedAt\n        }\n      }\n    }\n  }\n": typeof types.DeploymentsDocument,
    "\n  query deploymentEvents($deploymentId: String!) {\n    deploymentEvents(id: $deploymentId) {\n      edges {\n        node {\n          id\n          step\n          createdAt\n          completedAt\n        }\n      }\n    }\n  }\n": typeof types.DeploymentEventsDocument,
};
const documents: Documents = {
    "\n  query projects {\n    projects {\n      edges {\n        node {\n          id\n          name\n        }\n      }\n    }\n  }\n": types.ProjectsDocument,
    "\n  query project($projectId: String!) {\n    project(id: $projectId) {\n      id\n      name\n\n      services {\n        edges {\n          node {\n            id\n            name\n            createdAt\n            deletedAt\n          }\n        }\n      }\n    }\n  }\n": types.ProjectDocument,
    "\n  query environments($projectId: String!) {\n    environments(projectId: $projectId) {\n      edges {\n        node {\n          id\n          name\n        }\n      }\n    }\n  }\n": types.EnvironmentsDocument,
    "\n  query environment($environmentId: String!) {\n    environment(id: $environmentId) {\n      id\n      name\n      createdAt\n      deletedAt\n    }\n  }\n": types.EnvironmentDocument,
    "\n  query deployments(\n    $serviceId: String\n    $environmentId: String\n    $after: String\n    $before: String\n  ) {\n    deployments(\n      after: $after\n      before: $before\n      input: { serviceId: $serviceId, environmentId: $environmentId }\n    ) {\n      edges {\n        node {\n          id\n          status\n          createdAt\n          statusUpdatedAt\n        }\n      }\n    }\n  }\n": types.DeploymentsDocument,
    "\n  query deploymentEvents($deploymentId: String!) {\n    deploymentEvents(id: $deploymentId) {\n      edges {\n        node {\n          id\n          step\n          createdAt\n          completedAt\n        }\n      }\n    }\n  }\n": types.DeploymentEventsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query projects {\n    projects {\n      edges {\n        node {\n          id\n          name\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query projects {\n    projects {\n      edges {\n        node {\n          id\n          name\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query project($projectId: String!) {\n    project(id: $projectId) {\n      id\n      name\n\n      services {\n        edges {\n          node {\n            id\n            name\n            createdAt\n            deletedAt\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query project($projectId: String!) {\n    project(id: $projectId) {\n      id\n      name\n\n      services {\n        edges {\n          node {\n            id\n            name\n            createdAt\n            deletedAt\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query environments($projectId: String!) {\n    environments(projectId: $projectId) {\n      edges {\n        node {\n          id\n          name\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query environments($projectId: String!) {\n    environments(projectId: $projectId) {\n      edges {\n        node {\n          id\n          name\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query environment($environmentId: String!) {\n    environment(id: $environmentId) {\n      id\n      name\n      createdAt\n      deletedAt\n    }\n  }\n"): (typeof documents)["\n  query environment($environmentId: String!) {\n    environment(id: $environmentId) {\n      id\n      name\n      createdAt\n      deletedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query deployments(\n    $serviceId: String\n    $environmentId: String\n    $after: String\n    $before: String\n  ) {\n    deployments(\n      after: $after\n      before: $before\n      input: { serviceId: $serviceId, environmentId: $environmentId }\n    ) {\n      edges {\n        node {\n          id\n          status\n          createdAt\n          statusUpdatedAt\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query deployments(\n    $serviceId: String\n    $environmentId: String\n    $after: String\n    $before: String\n  ) {\n    deployments(\n      after: $after\n      before: $before\n      input: { serviceId: $serviceId, environmentId: $environmentId }\n    ) {\n      edges {\n        node {\n          id\n          status\n          createdAt\n          statusUpdatedAt\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query deploymentEvents($deploymentId: String!) {\n    deploymentEvents(id: $deploymentId) {\n      edges {\n        node {\n          id\n          step\n          createdAt\n          completedAt\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query deploymentEvents($deploymentId: String!) {\n    deploymentEvents(id: $deploymentId) {\n      edges {\n        node {\n          id\n          step\n          createdAt\n          completedAt\n        }\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;