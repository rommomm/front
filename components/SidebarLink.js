import React from "react";

function SidebarLink({ Icon, text }) {
  return (
    <div className={` flex items-center text-xl space-x-2`}>
      <Icon className="h-6" />
      <a>{text}</a>
    </div>
  );
}

export default SidebarLink;
