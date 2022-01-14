import React, { useState, useContext } from "react";
import { Menu, Dropdown } from "antd";
import Link from "next/link";
import { EllipsisOutlined } from "@ant-design/icons/lib/icons";
import useFormateDate from "../hooks/useFormatDate";
import CommentEditForm from "./CommentEditForm";
import { useSelector } from "react-redux";
import CommentsCount from "./CommentLikes";

function Comment({ comment, onDelete, onUpdate }) {
  const [editMode, setEditMode] = useState(false);
  const { isLoggedIn, user } = useSelector(({ auth }) => auth);
  function handleUpdatePost(values) {
    onUpdate(comment.id, values);
    setEditMode(false);
  }

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <button onClick={() => onDelete(comment.id)}>Delete</button>
      </Menu.Item>
      <Menu.Item key="1">
        <button onClick={() => setEditMode(!editMode)}>
          {editMode ? "Cancel" : "Edit"}
        </button>
      </Menu.Item>
    </Menu>
  );

  const formattedCreateAt = useFormateDate(comment.created_at, "dd LLL yyyy");

  const formattedUpdateAt = useFormateDate(
    comment.updated_at,
    "dd LLL yyyy HH:mm:ss"
  );

  return (
    <div className=" flex  justify-between p-2 cursor-pointer border-b">
      <div className="w-full ">
        <div className=" pl-12 flex ">
          <Link href={`/` + comment.author.user_name}>
            <img
              src={user.profile.profile_photo || "/default/avatar.png"}
              alt=""
              className="h-10 w-10 rounded-full mr-4"
            />
          </Link>
          <div className="text-[#6e767d] w-full">
            <div className="flex">
              <div>
                <Link href={`/` + comment.author.user_name}>
                  <a className="font-bold text-[15px]">
                    {comment.author.first_name}
                  </a>
                </Link>
              </div>
              <div>
                <span className="text-xs	 pl-1 $">
                  @{comment.author.user_name}
                </span>
              </div>
              <div>
                <span className="ml-2 text-xs	">{formattedCreateAt}</span>
                {comment.created_at !== comment.updated_at && (
                  <span className="ml-2 border text-xs	">
                    {formattedUpdateAt}
                  </span>
                )}
              </div>
            </div>
            {editMode ? (
              <CommentEditForm
                value={comment.content}
                onSave={handleUpdatePost}
                isLoggedIn={isLoggedIn}
                editMode={editMode}
                setEditMode={setEditMode}
              />
            ) : (
              <p
                className="break-words break-all text-xs	
              "
              >
                {comment.content}
              </p>
            )}
          </div>
        </div>
        <CommentsCount />
      </div>

      <div>
        {isLoggedIn && user.id === comment.author.id && (
          <Dropdown overlay={menu} trigger={["click"]}>
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              <EllipsisOutlined style={{ fontSize: "22px" }} />
            </a>
          </Dropdown>
        )}
      </div>
    </div>
  );
}

export default Comment;
