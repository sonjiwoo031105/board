import DeleteButton from "@/components/DeleteButton";
import Link from "next/link";

interface Props {
  params: { id: string };
}

export default async function PostDetail({ params }: Props) {
  const postId = params.id;
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/post/${postId}`);
  const post = await res.json();

  return (
    <main className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
      <p className="text-sm text-gray-600 mb-4">
        by {post.author ?? "익명"} |{" "}
        {new Date(post.createdAt).toLocaleString()}
      </p>
      <p>{post.content}</p>

      <Link href={`/post/${postId}/edit`}>
        <button className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded">
          수정하기
        </button>
      </Link>

      <DeleteButton postId={postId} />
    </main>
  );
}
