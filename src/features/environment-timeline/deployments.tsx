import clsx from "clsx";
import { Timeline } from "../../components/timeline";
import { useDeploymentEvents, useDeployments, useEnvironment } from "./hooks";
import { DeploymentStatus } from "~/lib/railway-client/gql/graphql";
import dayjs from "dayjs";
import { time } from "~/lib/time";
import { GetDeploymentEventsResult, GetDeploymentsResult } from "./api";

type DeploymentProps = {
  apiKey: string;
  environmentId: string;
  deployment: GetDeploymentsResult[number];
};

type DeploymentsProps = {
  apiKey: string;
  serviceId: string;
  environmentId: string;
};

const getDeploymentStyle = (status: DeploymentStatus) => {
  const style = {
    label: "",
    itemClassName: "bg-gray-100 border-gray-200 text-gray-950",
    badgeClassName: "bg-gray-200 text-gray-500",
  };

  switch (status) {
    case DeploymentStatus.Success:
      style.label = "Active";
      style.itemClassName = "bg-green-50 border-green-200 text-green-700";
      style.badgeClassName = "bg-green-200 text-green-700";
      break;
    case DeploymentStatus.Failed:
      style.label = "Failed";
      style.itemClassName = "bg-red-50 border-red-200 text-red-700";
      style.badgeClassName = "bg-red-200 text-red-700";
      break;
    case DeploymentStatus.Removed:
      style.label = "Removed";
      break;
    case DeploymentStatus.Building:
      style.label = "Building";
      style.badgeClassName = "bg-blue-200 text-blue-700";
      break;
    case DeploymentStatus.Deploying:
      style.label = "Deploying";
      style.badgeClassName = "bg-blue-200 text-blue-700";
      break;
    case DeploymentStatus.Sleeping:
      style.label = "Sleeping";
      style.itemClassName = "bg-yellow-50 border-yellow-200 text-yellow-700";
      style.badgeClassName = "bg-yellow-200 text-yellow-700";
      break;
    case DeploymentStatus.Crashed:
      style.label = "Crashed";
      style.itemClassName = "bg-red-50 border-red-200 text-red-700";
      style.badgeClassName = "bg-red-200 text-red-700";
      break;
    case DeploymentStatus.Skipped:
      style.label = "Skipped";
      break;
    case DeploymentStatus.Waiting:
      style.label = "Cancelled";
      break;

    case DeploymentStatus.NeedsApproval:
    case DeploymentStatus.Initializing:
    case DeploymentStatus.Removing:
      return null;
  }

  return style;
};

const getDeploymentRange = (events: GetDeploymentEventsResult) => {
  const start = events?.[0].createdAt;
  let end = events?.[events.length - 1].createdAt;

  if (!start || !end) return null;

  return {
    start: new Date(start),
    end: new Date(end),
  };
};

export const Deployment = ({
  apiKey,
  environmentId,
  deployment,
}: DeploymentProps) => {
  const events = useDeploymentEvents({
    apiKey,
    deploymentId: deployment.id,
  });

  const environment = useEnvironment({ apiKey, environmentId });

  if (!events.data || !environment.data) return null;

  const range = getDeploymentRange(events.data);
  if (!range) return null;

  const badge = getDeploymentStyle(deployment.status);

  return (
    <Timeline.Item
      range={range}
      className={clsx(
        "h-full w-full overflow-hidden border rounded-lg",
        badge?.itemClassName,
      )}
    >
      <div className={clsx("w-full h-full flex items-center px-2")}>
        {badge && (
          <span
            className={clsx(
              "mr-2 px-2 py-0.5 rounded-sm uppercase font-semibold text-xs",
              badge.badgeClassName,
            )}
          >
            {badge.label}
          </span>
        )}

        <p className="truncate w-full text-sm">
          {dayjs(deployment.createdAt).format("MMM D, YYYY, h:mma")} -{" "}
          {time.took(range.start, range.end)}
        </p>
      </div>
    </Timeline.Item>
  );
};

export const Deployments = ({
  apiKey,
  serviceId,
  environmentId,
}: DeploymentsProps) => {
  const deployments = useDeployments({
    apiKey,
    serviceId,
    environmentId,
  });

  if (!deployments.data) return null;

  return deployments.data.map((deployment) => (
    <Deployment
      key={deployment.id}
      apiKey={apiKey}
      environmentId={environmentId}
      deployment={deployment}
    />
  ));
};
