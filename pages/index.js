import React, { useState, useEffect } from "react";

function Page({ posts_ }) {
  const [posts, setPosts] = useState(posts_);
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  // useEffect(() => {
  //   setPosts(_posts);
  // }, []);

  const deletepost = (id) => {
    fetch(`http://localhost:8000/api/posts/${id}`, { method: "delete" }).then(
      (res) => {
        setPosts(posts.filter((p) => p.id !== id));
      }
    );
  };

  const add = () => {
    fetch(`http://localhost:8000/api/posts`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ name, text }),
    })
      .then((res) => res.json())
      .then((res) => {
        setPosts([...posts, res]);
      });
  };
  console.log("name", name);
  console.log("text", text);
  return (
    <>
      <input
        type="text"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Text"
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={() => add()}>Add</button>

      {posts.map((post) => {
        return (
          <div key={post.id}>
            <div>Post ID {post.id}</div>
            <div>Post name {post.name}</div>
            <button onClick={() => deletepost(post.id)}>DELETE</button>
          </div>
        );
      })}
    </>
  );
  // <div>
  //     <div>Post ID {firstpost.id}</div>
  //     <div>Post name {firstpost.name}</div>
  // </div>
}

Page.getInitialProps = async (ctx) => {
  const res = await fetch("http://localhost:8000/api/posts");
  const json = await res.json();
  console.log(json);
  return { posts_: json };
};

export default Page;
