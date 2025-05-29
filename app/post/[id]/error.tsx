'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="text-center text-red-500 mt-10">
      <p>문제가 발생했어요: {error.message}</p>
      <button
        onClick={reset}
        className="mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
      >
        다시 시도하기
      </button>
    </div>
  );
}
