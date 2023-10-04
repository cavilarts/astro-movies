import { useEffect, useState } from "react";
import { AiTwotoneHeart } from "react-icons/ai";

export interface LikeButtonProps {
  id: number;
}

export default function LikeButton({ id }: LikeButtonProps) {
  const [liked, setLiked] = useState<boolean>(false);

  const getLikeFromLocalStorage = () => {
    const like = localStorage.getItem(`${id}`);

    if (like) {
      setLiked(true);
    }
  };

  function handleLike(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setLiked((liked) => !liked);

    if (liked) {
      localStorage.removeItem(`${id}`);
    } else {
      localStorage.setItem(`${id}`, `${id}`);
    }
  }

  useEffect(() => {
    getLikeFromLocalStorage();
  }, []);

  return (
    <button
      className={`text-5xl ${liked ? "text-red-500" : "text-white"}`}
      onClick={handleLike}
    >
      <AiTwotoneHeart />
    </button>
  );
}
