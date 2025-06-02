import { formatDate } from "@/lib/formatDate";
import { Post } from "@/types/post";
import Link from "next/link";

export default function PostItem({ post }: { post: Post }) {
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
    )
}
