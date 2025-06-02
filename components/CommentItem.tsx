"use client";

import { Comment } from "@/types/comment";
import { ObjectId } from "mongodb";

interface Props {
  comment: Comment;
  onDelete: (id: ObjectId | undefined) => void;
  currentUserEmail?: string | null;
}

export default function CommentItem({ comment, onDelete, currentUserEmail }: Props) {
  return (
    <div className="mb-4 border-b pb-2">
      <div className="text-sm text-gray-600">{comment.author?.name || "익명"}</div>
      <div>{comment.content}</div>
      <div className="flex justify-between items-center">
        <div className="text-xs text-gray-400">
          {new Date(comment.createdAt).toLocaleString()}
        </div>
        {comment.author?.email === currentUserEmail && (
          <button
            className="text-sm text-red-500 hover:underline cursor-pointer"
            onClick={() => onDelete(comment._id)}
          >
            삭제
          </button>
        )}
      </div>
    </div>
  );
}
