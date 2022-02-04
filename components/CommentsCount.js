import { CommentOutlined, LikeOutlined } from "@ant-design/icons/lib/icons";
import Link from "next/link";
import React from "react";

function CommentsCount({ post }) {
  return (
    <div>
      <div className="w-5/6 m-auto	flex justify-start">
        <Link href={"/post/" + post.id}>
          <a>
            <CommentOutlined style={{ fontSize: "22px" }} />
            <span className="inline-block align-bottom text-sm pl-1">
              {!post.comments_count ? 0 : post.comments_count}
            </span>
          </a>
        </Link>
        <a className="pl-2">
          <LikeOutlined style={{ fontSize: "22px" }} />
          <span className="inline-block align-bottom text-sm pl-1">0</span>
        </a>
      </div>
    </div>
  );
}

export default CommentsCount;
