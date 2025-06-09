import PostList from "@/components/PostList";
import SocialLoginButtons from "@/components/SocialLoginButtons";
import WriteButton from "@/components/WriteButton";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { Suspense } from "react";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="p-4 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">📌 게시판</h1>
        <div className="flex">
          <WriteButton />
          {
            session
              ? <SocialLoginButtons />
              : <Link href="/login" className="ml-2 px-4 py-2 rounded bg-blue-400 text-white hover:bg-blue-500 cursor-pointer transition">로그인</Link>
          }
        </div>
      </div>

      <Suspense fallback={<p className="text-gray-500">게시글 로딩 중...</p>}>
        <PostList />
      </Suspense>
    </main>
  );
}
