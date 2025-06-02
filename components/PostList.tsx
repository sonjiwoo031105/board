"use client";

import Link from "next/link";
import { Post } from "@/types/post";
import { useEffect, useState } from "react";
import { SortType } from "@/types/sort";
import { formatDate } from "@/lib/formatDate";

const FILTERS = [
  { label: "🕒 최신순", value: SortType.LATEST },
  { label: "❤️ 좋아요순", value: SortType.LIKES },
  { label: "💬 댓글순", value: SortType.COMMENTS },
];

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SortType>(SortType.LATEST);

  useEffect(() => {
    fetch(`/api/posts?sort=${sortBy}`)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      });
  }, [sortBy]);
  
  return (
    <div>
      {/* 필터 UI */}
      <div className="flex gap-2 mb-6">
        {FILTERS.map((filter) => (
          <button
            key={filter.value}
            onClick={() => setSortBy(filter.value)}
            className={`px-3 py-1 rounded-full border text-sm transition cursor-pointer
              ${
                sortBy === filter.value
                  ? "bg-sky-500 text-white border-sky-500"
                  : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
              }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* 게시글 목록 */}
      {loading ? (
        <p className="text-gray-500">게시글 로딩 중...</p>
      ) : posts.length === 0 ? (
        <p className="text-gray-500">게시글이 없습니다.</p>
      ) : (
        <ul className="space-y-4">
          {posts.map((post) => {
            const { text, isEdited } = formatDate(post.createdAt, post.updatedAt);
            
            return (
              <li
                key={post._id?.toString()}
                className="border p-4 rounded-lg shadow-sm hover:shadow-md transition"
              >
                <Link href={`/post/${post._id?.toString()}`}>
                  <h2 className="text-xl font-semibold hover:underline">{post.title}</h2>
                </Link>
                <p className="text-gray-600 text-sm">
                  by {post.author?.name ?? "익명"} |{" "}
                  {text} {isEdited && <span className="text-xs text-gray-400">(수정됨)</span>}
                </p>
                <p className="text-sm mt-1 text-gray-500">
                  ❤️ {post.likesCount ?? 0} · 💬 {post.commentsCount ?? 0}
                </p>
                <p className="mt-2">{post.content}</p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
