import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import CommentSection from "@/components/CommentSection";
import DeleteButton from "@/components/DeleteButton";
import LikeButton from "@/components/LikeButton";
import { formatDate } from "@/lib/formatDate";
import { Post } from "@/types/post";
import { getServerSession } from "next-auth";
import Link from "next/link";

interface Props {
  params: Promise< { id: string }>;
}

export default async function PostDetail(context: Props) {
  const session = await getServerSession(authOptions);
  const { id: postId } = await context.params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/post/${postId}`);
  const post: Post = await res.json();

  const isMe = (
    post.author?.name == session?.user?.name && 
    post.author?.email == session?.user?.email
  ) ? true : false;

  const { text: formattedDate, isEdited } = formatDate(post.createdAt, post.updatedAt);

  return (
    <main className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
      <p className="text-sm text-gray-600 mb-4">
        by {post.author?.name ?? "익명"} | {formattedDate}
        {isEdited && <span className="ml-2 text-xs text-yellow-600">(수정됨)</span>}
      </p>
      <p>{post.content}</p>

      <div className="flex justify-between items-center mt-4">
        <LikeButton
          postId={postId}
          initialLiked={post.likes?.includes(session?.user?.email || "") || false}
          initialCount={post.likes?.length || 0}
        />
        {isMe && ( 
          <div className="space-x-2">
            <Link href={`/post/${postId}/edit`}>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded transition cursor-pointer">
                수정하기
              </button>
            </Link>
            <DeleteButton postId={postId} />
          </div>
        )}
      </div>

      <CommentSection postId={postId} />
    </main>
  );
}
