"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function SocialLoginButtons() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex items-center gap-4">
        <p>{session.user?.name}님</p>
        <button onClick={() => signOut()} className="bg-gray-500 text-white px-2 py-1 rounded transition">
          로그아웃
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <button
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className="flex items-center justify-center w-full gap-2 border border-gray-300 py-2 px-4 rounded-lg hover:bg-gray-100 transition"
      >
        <FcGoogle size={20} />
        <span className="text-sm font-medium">Google로 로그인</span>
      </button>

      <button
        onClick={() => signIn("github", { callbackUrl: "/" })}
        className="flex items-center justify-center w-full gap-2 border border-gray-300 py-2 px-4 rounded-lg hover:bg-gray-100 transition"
      >
        <FaGithub size={20} />
        <span className="text-sm font-medium">GitHub로 로그인</span>
      </button>
    </div>
  );
}
