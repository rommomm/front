import { Mentions } from "antd";
import { Option } from "antd/lib/mentions";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { allUsers, userApi } from "../redux/user/userApi";

function MentionInput({ value, onChange, rows }) {
  const [searchData, setSearchData] = useState([]);
  const dispatch = useDispatch();

  const handleSearch = async (search, prefix) => {
    const dynamicData =
      prefix === "@"
        ? await dispatch(allUsers.initiate({ username: search }))
        : null;
    setSearchData(dynamicData.data);
  };

  const searchList =
    searchData &&
    searchData.data &&
    searchData.data.length &&
    searchData.data.map((user) => {
      return (
        <Option
          key={user.id}
          value={user.user_name}
          className="antd-demo-dynamic-option"
        >
          <span className="mx-3">{user.user_name}</span>
        </Option>
      );
    });

  useEffect(() => {
    dispatch(userApi.util.resetApiState());
  });

  return (
    <div>
      <Mentions
        placeholder="Content"
        rows={rows}
        onChange={onChange}
        value={value}
        prefix={["@"]}
        onSearch={handleSearch}
      >
        {searchList ? searchList : null}
      </Mentions>
    </div>
  );
}

export default MentionInput;
