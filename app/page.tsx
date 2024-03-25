import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full h-screen flex">
      <div className="m-auto flex gap-x-2">
        <Link
          href="/login"
          className="py-2 px-6 rounded text-blue-700 underline bg-slate-200 hover:text-blue-800 hover:bg-slate-300 transition-all text-lg"
        >
          Login
        </Link>
        <Link
          href="/register"
          className="py-2 px-6 rounded text-blue-700 underline bg-slate-200 hover:text-blue-800 hover:bg-slate-300 transition-all text-lg"
        >
          Register
        </Link>
      </div>
    </main>
  );
}
