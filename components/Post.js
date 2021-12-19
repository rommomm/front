import React, { Fragment, useState, useContext } from "react";
import Link from "next/link";
import { Menu } from "@headlessui/react";
import { DotsHorizontalIcon } from "@heroicons/react/solid";
import UserContext from "./UserContext";
import moment from "moment";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import * as Yup from "yup";

function Post({ post, onDelete, onUpdate }) {
  const [editMode, setEditMode] = useState(false);
  const { isLoggedIn, user } = useContext(UserContext);
  function handleUpdatePost(value) {
    onUpdate(post.id, value);
    setEditMode(false);
  }
  const formInitialSchema = {
    text: post.text,
  };

  const formValidationSchema = Yup.object({
    text: Yup.string()
      .min(10, "* Too Short!")
      .max(255, "* Too Long!")
      .required("* Content is required"),
  });

  return (
    <div className=" flex p-2 cursor-pointer border-b border-gray-700">
      <div className=" m-2 space-y-2 w-full">
        <div className="flex">
          {!editMode && (
            <Link href={`/profile/` + post.user.user_name}>
              <a>
                <img
                  src="https://assets.puzzlefactory.pl/puzzle/311/987/original.webp"
                  alt=""
                  className="h-12 w-12 rounded-full mr-4"
                />
              </a>
            </Link>
          )}
          <div className="text-[#6e767d] w-full">
            <div className="inline-block flex group">
              <h4
                className={`font-bold text-[15px] sm:text-base text-[#d9d9d9] group-hover:underline ${
                  !editMode && "inline-block"
                }`}
              >
                <Link href={`/profile/` + post.user.user_name}>
                  <a>{post.user.user_name}</a>
                </Link>
              </h4>
              <span
                className={`text-sm sm:text-[15px] pl-1 ${
                  !editMode && "ml-1.5"
                }`}
              >
                @{post.user.user_name}
              </span>
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
                              type="text"
                              name="text"
                              rows="4"
                              className="resize-none border border-gray-700 bg-transparent outline-none text-[#d9d9d9] text-lg placeholder-gray-500 tracking-wide w-11/12 "
                            />
                            <div>
                              <p className=" text-sm pl-4 text-rose-500 text-red-600 absolute	">
                                <ErrorMessage name="text" />
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
              <p className="break-words break-all">{post.text}</p>
            )}
          </div>
        </div>
      </div>

      <div>
        {isLoggedIn && user.id === post.user.id && (
          <Menu as="div" className="relative bg-grey-dark inline-block ">
            <div>
              <Menu.Button className="inline-flex justify-center w-full px-2 py-1 bg-white text-sm font-medium text-gray-700 ">
                <div className="icon group flex-shrink-0 ml-auto">
                  <DotsHorizontalIcon className="h-5 text-[#6e767d] group-hover:text-[#1d9bf0]" />
                </div>
              </Menu.Button>
            </div>

            <Menu.Items className="z-50 absolute  right-0   rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  <button
                    className="text-gray-700
                        block px-4 py-2 text-sm hover:bg-gray-100 text-gray-800    "
                    onClick={() => onDelete(post.id)}
                  >
                    Delete
                  </button>
                </Menu.Item>

                <Menu.Item>
                  <button
                    className="text-gray-700
                    block px-6 py-2 text-sm hover:bg-gray-100 text-gray-800"
                    onClick={() => setEditMode(!editMode)}
                  >
                    {editMode ? "Cancel" : "Edit"}
                  </button>
                </Menu.Item>
              </div>
            </Menu.Items>
          </Menu>
        )}
      </div>
    </div>
  );
}

export default Post;
