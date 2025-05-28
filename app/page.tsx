"use client";

import AuthButton from "@/components/AuthButton";
import WriteButton from "@/components/WriteButton";
import { Post } from "@/types/post";
import Link from "next/link";
import { useEffect, useState } from "react";

interface ClientPost extends Omit<Post, "_id"> {
  _id?: string;
}

export default function Home() {
  const [posts, setPosts] = useState<ClientPost[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch("/api/posts");
      const data = await res.json();

      const converted = data.map((post: Post) => ({
        ...post,
        _id: post._id?.toString(),
      }));

      setPosts(converted);
    }

    fetchPosts();
  }, []);

  return (
    <main className="p-4 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">📌 게시판</h1>
        <div className="flex">
          <AuthButton />
          <WriteButton />
        </div>
      </div>

      {posts.length === 0 ? (
        <p>게시글이 없습니다.</p>
      ) : (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post._id} className="border p-4 rounded-lg shadow-sm">
              <Link href={`/post/${post._id}`}>
                <h2 className="text-xl font-semibold hover:underline">{post.title}</h2>
              </Link>
              <p className="text-gray-600 text-sm">
                by {post.author?.name ?? "익명"} | {" "}
                {new Date(post.createdAt).toLocaleString()}
              </p>
              <p className="mt-2">{post.content}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
