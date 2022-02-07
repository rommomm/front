import { Mentions } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { allUsers } from "../redux/user/userApi";

const { Option } = Mentions;

function MentionInput({ value, onChange }) {
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

  return (
    <div>
      <Mentions
        rows={6}
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
