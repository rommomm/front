import { Pagination } from "antd";
import React, { useState } from "react";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import UsersList from "../components/UsersList";
import useAuthMe from "../hooks/useAutMe";
import { useSearchUserQuery, useAllUsersQuery } from "../redux/user/userApi";

function Search() {
  const [currentPage, setCurrentPage] = useState(1);
  const { isLoading: isLoadingUser, isSuccess: isLoggedIn } = useAuthMe();
  const [searchUser, setSearchUser] = useState();
  const { data: user, isFetching } = useSearchUserQuery(searchUser, {
    skip: !searchUser,
  });
  const { data: users, isLoading: isLoadingUsers } =
    useAllUsersQuery(currentPage);

  function perPage(page) {
    setCurrentPage(page);
  }

  if (isLoadingUsers || isLoadingUser) {
    return <Loader />;
  }

  return (
    <Layout title="Users">
      <div className="flex-grow  border-gray-700 max-w-3xl sm:ml-[73px] xl:ml-[380px]">
        <div className="text-[#d9d9d9] flex items-center sm:justify-between py-2 px-3  top-0 z-50  border-b border-gray-700 sticky bg-gray-700 text-white">
          {users.meta.total} Users
        </div>

        <div className="border-black border-l border-r w-full max-w-screen-md ">
          <div className="border-b border-black pb-4">
            <div className="pt-5 flex justify-center">
              <div class="flex border-black border rounded w-2/3">
                <input
                  type="text"
                  class="block w-full p-3 rounded "
                  placeholder="Search..."
                  onChange={(e) => setSearchUser(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div>
            {(user && user.length) ||
              (users && users.data.length && (
                <UsersList
                  users={!searchUser ? users && users.data : user && user.data}
                />
              ))}
          </div>
        </div>
        <div
          className={`bottom-0 m-auto  py-1 px-1 border-black border-l border-r 
            ${!isLoggedIn && "pb-20"}
          `}
        >
          {!searchUser ? (
            <Pagination
              size="small"
              total={users.meta.total}
              onChange={perPage}
            />
          ) : null}
        </div>
      </div>
    </Layout>
  );
}

export default Search;
