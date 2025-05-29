"use client";

import { Post } from "@/types/post";
import Link from "next/link";
import { useEffect, useState } from "react";

interface ClientPost extends Omit<Post, "_id"> {
  _id?: string;
}

export default function PostList() {
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
        posts.length === 0 ? (
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
        )
    );
}
