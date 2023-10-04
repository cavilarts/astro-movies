import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons/faHeart";

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
      className={`text-3xl ${liked ? "text-red-500" : "text-white"}`}
      onClick={handleLike}
    >
      <FontAwesomeIcon icon={faHeart} />
    </button>
  );
}
