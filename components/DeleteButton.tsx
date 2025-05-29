"use client";

import { useRouter } from "next/navigation";

interface DeleteButtonProps {
  postId: string;
}

export default function DeleteButton({ postId }: DeleteButtonProps) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("정말 삭제하시겠습니까?")) return;

    try {
      const res = await fetch(`/api/post/${postId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("삭제가 완료되었습니다.");
        router.push("/"); 
      } else {
        const data = await res.json();
        alert(`삭제 실패: ${data.message}`);
      }
    } catch (error) {
      alert("삭제 중 오류가 발생했습니다.");
      console.error(error);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition cursor-pointer"
    >
      삭제
    </button>
  );
}
