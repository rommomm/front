import { useRouter } from "next/router";

export default function Mention({ username }) {
  console.log("username", username);
  const router = useRouter();

  const handleClick = (e) => {
    e.stopPropagation();
    router.push(`/${username}`);
  };

  return (
    <span onClick={handleClick} className="btn text-info p-0">
      @{username}
    </span>
  );
}
