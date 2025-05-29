import Link from "next/link";
import { Post } from "@/types/post";

export default async function PostList() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`);

  const posts: Post[] = await res.json();

  if (posts.length === 0) {
    return <p>게시글이 없습니다.</p>;
  }

  return (
    <ul className="space-y-4">
      {posts.map((post) => (
        <li key={post._id?.toString()} className="border p-4 rounded-lg shadow-sm">
          <Link href={`/post/${post._id?.toString()}`}>
            <h2 className="text-xl font-semibold hover:underline">{post.title}</h2>
          </Link>
          <p className="text-gray-600 text-sm">
            by {post.author?.name ?? "익명"} |{" "}
            {new Date(post.createdAt).toLocaleString()}
          </p>
          <p className="mt-2">{post.content}</p>
        </li>
      ))}
    </ul>
  );
}
