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
  const [isLiked, setIsLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(initialCount);
  const [loading, setLoading] = useState(false);

  const toggleLike = async () => {
    if (!session) return alert("로그인이 필요합니다");

    setLoading(true);
    setIsLiked((prev) => !prev);
    setLikeCount((prev) => isLiked ? prev - 1 : prev + 1);

    try {
      await fetch(`/api/post/${postId}/like`, {
        method: "PUT",
      });
    } catch (error) {
      setIsLiked((prev) => !prev);
      setLikeCount(() => isLiked ? likeCount + 1 : likeCount - 1);
      alert("좋아요 처리에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={toggleLike} disabled={loading} className="text-sm text-gray-600 hover:text-pink-600">
      ❤️ {isLiked ? "좋아요 취소" : "좋아요"} ({likeCount})
    </button>
  );
}
