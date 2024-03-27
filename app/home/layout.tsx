'use client';

import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"

export default function HomeLayout ({ children }: { children: React.ReactNode }) {
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const router = useRouter()

  useEffect(() => {
    (async () => {
      const { data, status } =  await getUser()

      if (!status) {
        router.push('/')
        return
      }

      router.push('/home')

      // if the error did not happen, if everything is alright
      setIsSuccess(true);
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
    <div>
      {children}
    </div>
  )
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
