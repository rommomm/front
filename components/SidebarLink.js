import React from "react";

function SidebarLink({ Icon, text }) {
  return (
    <div className={` flex items-center xl:justify-start text-xl space-x-2`}>
      <Icon className="h-7" />
      <a>{text}</a>
    </div>
  );
}

export default SidebarLink;
