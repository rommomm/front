import React, { Fragment, useState, useContext } from "react";
import Link from "next/link";
import { DotsHorizontalIcon } from "@heroicons/react/solid";
import UserContext from "./UserContext";
import moment from "moment";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Menu, Dropdown } from "antd";

function Post({ post, onDelete, onUpdate }) {
  const [editMode, setEditMode] = useState(false);
  const { isLoggedIn, user } = useContext(UserContext);
  function handleUpdatePost(value) {
    onUpdate(post.id, value);
    setEditMode(false);
  }
  const formInitialSchema = {
    content: post.content,
  };

  const formValidationSchema = Yup.object({
    content: Yup.string()
      .min(10, "* Too Short!")
      .max(255, "* Too Long!")
      .required("* Content is required"),
  });

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

  return (
    <div className=" flex  justify-between p-2 cursor-pointer border-b border-gray-700">
      <div className="m-2 space-y-2 w-full">
        <div className="flex">
          {!editMode && (
            <Link href={`/profile/` + post.author.user_name}>
              <img
                src="https://assets.puzzlefactory.pl/puzzle/311/987/original.webp"
                alt=""
                className="h-12 w-12 rounded-full mr-4"
              />
            </Link>
          )}
          <div className="text-[#6e767d] w-full">
            <div className="inline-block flex group">
              <h4
                className={`font-bold text-[15px] sm:text-base text-[#d9d9d9] ${
                  !editMode && "inline-block"
                }`}
              >
                <Link href={`/profile/` + post.author.user_name}>
                  <a>{post.author.first_name}</a>
                </Link>
              </h4>
              <p
                className={`text-sm sm:text-[15px] pl-1 ${
                  !editMode && "ml-1.5"
                }`}
              >
                @{post.author.user_name}
              </p>
              <span className="ml-2">
                {moment(post.created_at).format("DD MMM YYYY")}
              </span>
              {moment(post.created_at).format("DD MMM YYYY HH:mm:ss") !==
              moment(post.updated_at).format("DD MMM YYYY HH:mm:ss") ? (
                <span className="ml-2">
                  {moment(post.updated_at).format("DD MMM YYYY HH:mm")}
                </span>
              ) : null}
            </div>
            {editMode ? (
              <div className="flex">
                <img
                  src="https://assets.puzzlefactory.pl/puzzle/311/987/original.webp"
                  alt=""
                  className="h-12 w-12 rounded-full mr-4"
                />
                <div>
                  <div>
                    <Fragment>
                      <div className="col-md-8 offset-md-2">
                        <Formik
                          initialValues={formInitialSchema}
                          validationSchema={formValidationSchema}
                          onSubmit={handleUpdatePost}
                        >
                          <Form>
                            <Field
                              component="textarea"
                              type="content"
                              name="content"
                              rows="4"
                              className="resize-none border border-gray-700 bg-transparent outline-none text-[#d9d9d9] text-lg placeholder-gray-500 tracking-wide w-11/12 "
                            />
                            <div>
                              <p className=" text-sm pl-4 text-rose-500 text-red-600 absolute	">
                                <ErrorMessage name="content" />
                              </p>
                            </div>
                            <div className="flex justify-between pt-2.5 pr-2 pb-2">
                              <div>
                                <div className="ml-96 pl-28">
                                  {isLoggedIn && (
                                    <div className="icon group flex flex col">
                                      <div className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mr-2">
                                        {editMode ? (
                                          <button type="submit">Save</button>
                                        ) : (
                                          <button
                                            onClick={() => onDelete(post.id)}
                                          >
                                            Delete
                                          </button>
                                        )}
                                      </div>
                                      <div className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                                        <button
                                          onClick={() => setEditMode(!editMode)}
                                        >
                                          Cancel
                                        </button>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </Form>
                        </Formik>
                      </div>
                    </Fragment>
                  </div>
                </div>
              </div>
            ) : (
              <p className="break-words break-all">{post.content}</p>
            )}
          </div>
        </div>
      </div>

      <div>
        {isLoggedIn && user.id === post.author.id && (
          <Dropdown overlay={menu} trigger={["click"]}>
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              <DotsHorizontalIcon className="h-5 text-[#6e767d] group-hover:text-[#1d9bf0]" />
            </a>
          </Dropdown>
        )}
      </div>
    </div>
  );
}

export default Post;
