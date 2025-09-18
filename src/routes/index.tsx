import { createFileRoute } from "@tanstack/react-router";
import { EnvironmentTimeline } from "../features/environment-timeline";

export const Route = createFileRoute("/")({
  component: Home,
  ssr: false,
});

function Home() {
  return <EnvironmentTimeline className="h-screen" />;
}
