'use client';

export default function Error(
    { error, reset }: { error: Error; reset: () => void }
) {
  return (
    <div className="text-center text-red-500">
      <p>문제가 발생했어요: {error.message}</p>
      <button onClick={reset} className="mt-4 bg-gray-200 p-2 rounded cursor-pointer">다시 시도하기</button>
    </div>
  );
}
