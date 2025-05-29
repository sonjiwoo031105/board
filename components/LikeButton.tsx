'use client';

import { useSession } from "next-auth/react";
import { useState } from "react";

type Props = {
  postId: string;
  initialLiked: boolean;
  initialCount: number;
};

export default function LikeButton({ postId, initialLiked, initialCount }: Props) {
  const { data: session } = useSession();
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);

  const toggleLike = async () => {
    if (!session) return alert("로그인이 필요합니다");

    const res = await fetch(`/api/post/${postId}/like`, {
      method: "PUT",
    });
    const data = await res.json();

    setLiked(data.liked);
    setCount(data.count);
  };

  return (
    <button onClick={toggleLike} className="text-sm text-gray-600 hover:text-pink-600">
      ❤️ {liked ? "좋아요 취소" : "좋아요"} ({count})
    </button>
  );
}
