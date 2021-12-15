import React from "react";

function SidebarLink({ Icon, text }) {
  return (
    <div
      className={` flex items-center justify-center xl:justify-start text-xl space-x-2`}
    >
      <Icon className="h-7" />
      <span className="hidden xl:inline no-underline hover:underline">
        {text}
      </span>
    </div>
  );
}

export default SidebarLink;
