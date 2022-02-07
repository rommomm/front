import { useRouter } from "next/router";

export default function Mention({ username }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/${username}`);
  };

  return (
    <span onClick={handleClick} className="btn text-info p-0">
      @{username}
    </span>
  );
}
