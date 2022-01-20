import Link from "next/link";
import React from "react";

function CommentsGuestBanner({ count }) {
  return (
    <div className="w-full  p-2 border-black border-b">
      {count > 0 ? (
        <span>You must be logged in to post a comment</span>
      ) : (
        <span>No comments yet... Be the first!</span>
      )}{" "}
      <Link href="/sign-up">
        <a className="underline underline-offset-1 text-blue-500">Sign up</a>
      </Link>{" "}
      or{" "}
      <Link href="/sign-in">
        <a className="underline underline-offset-1 text-blue-500">Sign in</a>
      </Link>
    </div>
  );
}

export default CommentsGuestBanner;
