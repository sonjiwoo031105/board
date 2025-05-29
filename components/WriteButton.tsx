'use client';

import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function WriteButton() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleClick = () => {
    if (status === "loading") return;

    if (!session) {
      alert("로그인 후 이용 가능합니다.");
      router.push("/login");
    } else {
      router.push("/write");
    }
  };

  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
    >
      글 작성하기
    </button>
  );
}
