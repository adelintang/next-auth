'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const router = useRouter()

  useEffect(() => {
    (async () => {
      const { data, status } =  await getUser()

      if (!status) {
        router.push('/')
        setIsSuccess(true);
        
        return
      }

      router.push('/home')

      // if the error did not happen, if everything is alright
    })()
  }, [router])

  if (!isSuccess) {
    return (
      <div className="min-h-screen flex">
        <p className="m-auto">Loading...</p>
      </div>
    )
  }

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

async function getUser () {
  const response = await fetch('/api/me')
  const responseJson = await response.json()
  const { status, data, message } = responseJson

if (!status) {
  return {
    status, message
  }
}

  return {
    status, data
  }
}
