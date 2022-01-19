import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Spin } from "antd";

function SettingsLayout({ children }) {
  const router = useRouter();
  const { user } = useSelector(({ user }) => user);

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, []);

  if (!user)
    return (
      <div className=" fixed inset-1/2 ">
        <Spin tip="Loading..." size="large" />
      </div>
    );
  return <div> {children} </div>;
}

export default SettingsLayout;
