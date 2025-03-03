import { LoginButton } from "@/src/auth/LoginButton";

export default function Landing() {
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gray-50 p-6 relative">
      <div className="absolute top-5 right-5">
        <LoginButton />
      </div>
      <div className="text-center ">
        <h1 className="text-2xl font-bold text-gray-700">Your Best Todo App</h1>
        <p className="text-gray-500 mt-2">
          Organize your life with the best Todo App.
        </p>
      </div>
    </div>
  );
}
