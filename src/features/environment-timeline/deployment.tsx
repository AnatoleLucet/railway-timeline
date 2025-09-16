import clsx from "clsx";
import { Timeline } from "../../components/timeline";

type DeploymentProps = {
  status:
    | "pending"
    | "deploying"
    | "completed"
    | "failed"
    | "active"
    | "sleeping";
  range: { start: Date; end: Date };

  children?: React.ReactNode;
};

const deployementBadges = {
  active: {
    label: "Active",
    className: "bg-green-200 text-green-700",
  },
  failed: {
    label: "Failed",
    className: "bg-red-200 text-red-700",
  },
  completed: {
    label: "Removed",
    className: "bg-gray-200 text-gray-500",
  },
  pending: {
    label: "Pending",
    className: "bg-gray-200 text-gray-500",
  },
  deploying: {
    label: "Deploying",
    className: "bg-blue-200 text-blue-700",
  },
  sleeping: {
    label: "Sleeping",
    className: "bg-yellow-200 text-yellow-700",
  },
};

export const Deployment = ({ status, range, children }: DeploymentProps) => {
  const badge = deployementBadges[status] || null;

  return (
    <Timeline.Item
      range={range}
      className={clsx("h-full w-full overflow-hidden border rounded-lg", {
        "bg-green-50 border-green-200 text-green-700": status === "active",
        "bg-red-50 border-red-200 text-red-700": status === "failed",
        "bg-gray-100 border-gray-200 text-gray-950": status === "completed",
        "bg-yellow-50 border-yellow-200 text-yellow-700": status === "sleeping",
        "bg-gray-100 border-gray-200 text-gray-500":
          status === "pending" || status === "deploying",
      })}
    >
      <div className={clsx("w-full h-full flex items-center px-2")}>
        {badge && (
          <span
            className={clsx(
              "mr-2 px-2 py-0.5 rounded-sm uppercase font-semibold text-xs",
              badge.className,
            )}
          >
            {badge.label}
          </span>
        )}

        <p className="truncate w-full">{children}</p>
      </div>
    </Timeline.Item>
  );
};
