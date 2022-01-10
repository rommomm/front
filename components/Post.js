import React, { useState, useContext } from "react";
import { Menu, Dropdown } from "antd";
import Link from "next/link";
import UserContext from "./UserContext";
import { EllipsisOutlined } from "@ant-design/icons/lib/icons";
import useFormateDate from "../hooks/useFormatDate";
import PostEditForm from "./PostEditForm";
import CommentsCount from "./CommentsCount";
import { useDispatch, useSelector } from "react-redux";
import CommentsSystem from "./CommentsSystem";
import { getAllCommentsByPosts } from "../redux/posts/actions";

function Post({ post, onDelete, onUpdate }) {
  const [editMode, setEditMode] = useState(false);
  const [editComment, setEditComment] = useState(false);
  const { isLoggedIn, user } = useSelector(({ auth }) => auth);
  const { openedPostComments } = useSelector(({ posts }) => posts);
  const dispatch = useDispatch();

  function handleUpdatePost(value) {
    onUpdate(post.id, value);
    setEditMode(false);
  }

  function showComments() {
    dispatch(getAllCommentsByPosts(post.id));
    setEditComment(!editComment);
  }

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <button onClick={() => onDelete(post.id)}>Delete</button>
      </Menu.Item>
      <Menu.Item key="1">
        <button onClick={() => setEditMode(!editMode)}>
          {editMode ? "Cancel" : "Edit"}
        </button>
      </Menu.Item>
    </Menu>
  );

  const formattedCreateAt = useFormateDate(post.created_at, "dd LLL yyyy");

  const formattedUpdateAt = useFormateDate(
    post.updated_at,
    "dd LLL yyyy HH:mm:ss"
  );

  return (
    <div>
      <div className=" flex  justify-between p-2 cursor-pointer border-b border-gray-700">
        <div className="m-2 space-y-2 w-full">
          <div className="flex">
            <Link href={`/` + post.author.user_name}>
              <img
                src="https://assets.puzzlefactory.pl/puzzle/311/987/original.webp"
                alt=""
                className="h-12 w-12 rounded-full mr-4"
              />
            </Link>
            <div className="text-[#6e767d] w-full">
              <div className="flex">
                <div>
                  <Link href={`/` + post.author.user_name}>
                    <a className="font-bold text-[15px] ">
                      {post.author.first_name}
                    </a>
                  </Link>
                </div>
                <div>
                  <span className="text-sm pl-1">@{post.author.user_name}</span>
                </div>
                <div>
                  <span className="ml-2">{formattedCreateAt}</span>
                  {post.created_at !== post.updated_at && (
                    <span className="ml-2 border text-xs	">
                      {formattedUpdateAt}
                    </span>
                  )}
                </div>
              </div>
              {editMode ? (
                <PostEditForm
                  value={post.content}
                  onSave={handleUpdatePost}
                  isLoggedIn={isLoggedIn}
                  editMode={editMode}
                  setEditMode={setEditMode}
                />
              ) : (
                <p className="break-words break-all">{post.content}</p>
              )}
            </div>
          </div>
          <CommentsCount
            counterComments={post.comments_count}
            showComments={showComments}
          />
        </div>
        <div>
          {isLoggedIn && user.id === post.author.id && (
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
      <div className="relative">
        {editComment && openedPostComments === post.id && (
          <CommentsSystem post={post} />
        )}
      </div>
    </div>
  );
}

export default Post;
