import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Post() {
  const [post, setPost] = useState(null);
  const [text, setText] = useState("");

  function updatePost() {
    fetch(`http://localhost:8000/api/posts/${post.id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    }).then(() => {
      router.push("/");
    });
  }

  const router = useRouter();
  useEffect(() => {
    if (router.query.id) {
      getPosts();
    }
  }, [router.query]);

  function getPosts() {
    fetch(`http://localhost:8000/api/posts/${router.query.id}`)
      .then((result) => result.json())
      .then((resp) => {
        setPost(resp);
        setText(resp.text);
      });
  }

  return (
    <>
      <input
        type="text"
        value={text}
        placeholder="Text"
        onChange={(e) => setText(e.target.value)}
      />{" "}
      <button onClick={updatePost}>Update Post</button>
    </>
  );
}
