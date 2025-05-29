import SocialLoginButtons from "@/components/SocialLoginButtons";

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="p-6 border rounded-xl shadow-md w-full max-w-sm">
        <h1 className="text-xl font-bold mb-4 text-center">로그인</h1>
        <SocialLoginButtons />
      </div>
    </div>
  );
}
