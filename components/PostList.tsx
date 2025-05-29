"use client";

import { Post } from "@/types/post";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function PostList() {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
      fetch(`/api/posts`)
        .then((res) => res.json())
        .then((data) => setPosts(data));
    }, []);

    return (
        posts.length === 0 ? (
            <p>게시글이 없습니다.</p>
        ) : (
            <ul className="space-y-4">
            {posts.map((post) => (
                <li key={post._id?.toString()} className="border p-4 rounded-lg shadow-sm">
                <Link href={`/post/${post._id?.toString()}`}>
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
        )
    );
}
