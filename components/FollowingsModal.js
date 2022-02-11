import Modal from "antd/lib/modal/Modal";
import React, { useState } from "react";
import { useFollowingsQuery } from "../redux/user/userApi";
import FollowingsList from "./FollowingsList";

function FollowingsModal({ author }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { data } = useFollowingsQuery(
    { username: author.user_name, page: 1 },
    { skip: !author }
  );

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <span className="text-base pl-2">
        <span className="text-xl pr-1 font-bold">
          {author.followings_count}
        </span>
        <a onClick={showModal}>Followings</a>
      </span>
      <Modal
        visible={isModalVisible}
        onCancel={handleCancel}
        closable={false}
        maskClosable={true}
        width="275px"
        okText="Save"
      >
        <FollowingsList />
      </Modal>
    </div>
  );
}

export default FollowingsModal;
