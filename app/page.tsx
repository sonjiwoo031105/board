import AuthButton from "@/components/AuthButton";
import PostList from "@/components/PostList";
import WriteButton from "@/components/WriteButton";

export default function Home() {
  return (
    <main className="p-4 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">📌 게시판</h1>
        <div className="flex">
          <AuthButton />
          <WriteButton />
        </div>
      </div>
      <PostList />
    </main>
  );
}
