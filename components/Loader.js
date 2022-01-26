import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

function Loader() {
  const antIcon = <LoadingOutlined style={{ fontSize: 100 }} spin />;

  return (
    <div className="fixed inset-1/2 ">
      <Spin indicator={antIcon} size="large" />
    </div>
  );
}

export default Loader;
