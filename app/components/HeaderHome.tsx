'use client';

import { useRouter } from "next/navigation"

async function DeleteAuth() {
  try {
    const response = await fetch('/api/logout', { method: 'DELETE' })
    const responseJson = await response.json()
    return responseJson
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
    }
  }
}

export default function HeaderHome () {
  const router = useRouter()

  async function onLogoutHandler() {
    try {
      await DeleteAuth()
      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <header className="bg-[#14213D] flex items-center justify-between p-3">
      <h1 className="text-white">Username</h1>
      <button
        className="text-white bg-red-600 hover:bg-red-700 py-1 px-2 rounded"
        type="button"
        onClick={onLogoutHandler}
      >
        Logout
      </button>
    </header>
  )
}
