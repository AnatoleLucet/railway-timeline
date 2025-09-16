import type React from "react";

const SidebarIem = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="h-14 py-2 pr-4 flex items-center justify-end border-b border-gray-200 last:border-0">
      {children}
    </div>
  );
};

export const Sidebar = () => {
  return (
    <ul className="h-full w-48 pt-14 border-r border-gray-200">
      <SidebarIem>Service A</SidebarIem>
      <SidebarIem>Service B</SidebarIem>
    </ul>
  );
};
