import React from "react";

const PostsList = ({ posts, onDeletePost }) => {
  return posts.map((item, i) => (
    <tr key={i}>
      <td>{item.id}</td>
      <td>{item.text}</td>
      <td>
        <button onClick={() => onDeletePost(item.id)}>Delete</button>
        <Link
          href={{
            pathname: "/post/[id]",
            query: { id: item.id },
          }}
        >
          <button>View</button>
        </Link>
      </td>
    </tr>
  ));
};

export default PostsList;
