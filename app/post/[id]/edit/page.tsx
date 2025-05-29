"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = React.use(params);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/post/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("게시글을 불러올 수 없습니다.");
        return res.json();
      })
      .then((data) => {
        setTitle(data.title);
        setContent(data.content);
      })
      .catch(() => {
        setError("❌ 게시글을 불러올 수 없습니다.");
      });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!title.trim() || !content.trim()) {
      setError("❗ 제목과 내용을 모두 입력해주세요.");
      return;
    }

    try {
    const setPost = {
        id,
        title,
        content, 
      };

      const res = await fetch(`/api/post/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(setPost),
      });

      if (!res.ok) {
        const result = await res.json();
        setError(`❌ 오류: ${result.message || "수정 실패"}`);
        return;
      }

      setMessage("✅ 수정 완료!");
      setTimeout(() => {
        router.replace(`/post/${id}`);
      }, 300);
    } catch (err) {
      setError("❌ 네트워크 오류가 발생했습니다.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">게시글 수정</h1>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목"
        className="w-full p-2 border rounded"
      />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="내용"
        className="w-full p-2 border rounded h-40"
      />

      {error && <p className="text-red-500">{error}</p>}
      {message && <p className="text-green-600">{message}</p>}

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
      >
        저장
      </button>
    </form>
  );
}
