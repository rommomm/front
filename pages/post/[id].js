import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Post() {
  const [post, setPost] = useState(null);
  const [text, setText] = useState("");
  const router = useRouter();

  function updatePost() {
    axios
      .put(`http://localhost:8000/api/posts/${post.id}`, { text, post })
      .then(() => {
        router.push("/");
      });
  }

  useEffect(() => {
    if (router.query.id) {
      getPosts();
    }
  }, [router.query]);

  function getPosts() {
    axios
      .get(`http://localhost:8000/api/posts/${router.query.id}`)
      .then((res) => {
        setPost(res.data);
      });
  }

  return (
    <>
      <input
        type="text"
        value={text}
        placeholder="Text"
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={updatePost}>Update Post</button>
    </>
  );
}
