import React, { useState, useEffect } from "react";

function Page({ posts_ }) {
  const [posts, setPosts] = useState(posts_);
  const [text, setText] = useState("");

  const deletepost = (id) => {
    fetch(`http://localhost:8000/api/posts/${id}`, { method: "delete" }).then(
      (res) => {
        setPosts(posts.filter((p) => p.id !== id));
      }
    );
  };

  const requestOptions = () => {
    fetch(`http://localhost:8000/api/posts`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ text }),
    })
      .then((res) => res.json())
      .then((res) => {
        setText([...posts, res]);
      });
  };

  const add = () => {
    fetch(`http://localhost:8000/api/posts`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ text }),
    })
      .then((res) => res.json())
      .then((res) => {
        setPosts([...posts, res]);
      });
  };
  console.log("text", text);
  return (
    <>
      <input
        type="text"
        placeholder="Text"
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={() => add()}>Add</button>

      {posts.map((post) => {
        return (
          <div key={post.id}>
            <div>Post ID:{post.id}</div>
            <div>Post text:{post.text}</div>
            <button onClick={() => deletepost(post.id)}>DELETE</button>
          </div>
        );
      })}
    </>
  );
}

Page.getInitialProps = async (ctx) => {
  const res = await fetch("http://localhost:8000/api/posts");
  const json = await res.json();
  console.log(json);
  return { posts_: json };
};

export default Page;
