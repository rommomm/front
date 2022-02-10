import Modal from "antd/lib/modal/Modal";
import React, { useState } from "react";
import FollowersList from "./FollowersList";

function FollowersModal({ author }) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <span className="text-base ">
        <span className="text-xl pr-1 font-bold">{author.followers_count}</span>
        <a onClick={showModal}>Followers</a>
      </span>
      <Modal
        visible={isModalVisible}
        onCancel={handleCancel}
        closable={false}
        maskClosable={true}
        width="275px"
      >
        <FollowersList author={author} />
      </Modal>
    </div>
  );
}

export default FollowersModal;
