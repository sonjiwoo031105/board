"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex items-center gap-4">
        <p>{session.user?.name}님</p>
        <button onClick={() => signOut()} className="bg-gray-500 text-white px-2 py-1 rounded">
          로그아웃
        </button>
      </div>
    );
  }

  return (
    <button onClick={() => signIn("google")} className="bg-blue-500 text-white px-2 py-1 rounded">
      로그인
    </button>
  );
}
