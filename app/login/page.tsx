'use client';

import WrapperAuth from "../components/WrapperAuth";

export interface ILogin {
  email: string
  password: string
}

async function PostLogin({ email, password }: ILogin) {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

      const user = await response.json()
      return user;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
      }
    }
}

export default function LoginPage() {
  return (
    <main className="w-full min-h-screen flex bg-[#14213D]">
      <WrapperAuth onLogin={PostLogin} name="login" />
    </main>
  )
}
