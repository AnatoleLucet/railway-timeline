import { Timeline } from "../../components/timeline";

type ServiceProps = {
  name: string;

  children?: React.ReactNode;
};

export const Service = ({ name, children }: ServiceProps) => {
  return (
    <Timeline.Row className="h-14 py-2 border-b border-gray-200 last:border-0">
      <div className="h-full w-full relative">{children}</div>
    </Timeline.Row>
  );
};
