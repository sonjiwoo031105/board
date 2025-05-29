'use client';

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Comment } from "@/types/comment";

export default function CommentSection({ postId }: { postId: string }) {
  const { data: session } = useSession();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/comment/${postId}`)
      .then((res) => res.json())
      .then((data) => {
        setComments(data);
        setLoading(false);
    });
  }, [postId]);

  const handleSubmit = async () => {
    if (!newComment.trim()) return;
    const res = await fetch("/api/comment/new", {
      method: "POST",
      body: JSON.stringify({ postId, content: newComment }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      const added = await res.json();
      setComments([added, ...comments]);
      setNewComment("");
    }
  };

  if (loading) {
    return <p className="text-gray-500">댓글 로딩 중...</p>;
  }

  return (
    <div className="mt-8">
      <h2 className="text-lg font-bold mb-2">댓글 ({comments.length})</h2>

      {session && (
        <div className="mb-4">
          <textarea
            className="w-full p-2 border rounded"
            rows={3}
            placeholder="댓글을 입력하세요"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            onClick={handleSubmit}
            className="mt-2 px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            댓글 작성
          </button>
        </div>
      )}
      
      {comments.length === 0 && <p>댓글이 없습니다.</p>}

      {comments.map((c) => (
        <div key={c._id?.toString()} className="mb-4 border-b pb-2">
          <div className="text-sm text-gray-600">{c.author?.name || "익명"}</div>
          <div>{c.content}</div>
          <div className="text-xs text-gray-400">{new Date(c.createdAt).toLocaleString()}</div>
        </div>
      ))}
    </div>
  );
}
