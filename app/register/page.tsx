'use client';

import WrapperAuth from "../components/WrapperAuth";

export interface IRegister {
  email: string
  username: string
  password: string
}

const PostRegister = ({ email, username, password }: IRegister) => {
  async function fetchRegister() {
    try {
      const response = await fetch('http://localhost:3000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, username, password })
    })
  
    const user = await response.json()
    return user;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
      }
    }
  }

  return fetchRegister()
}



export default function RegisterPage () {
  return (
    <main className="w-full min-h-screen flex bg-[#14213D]">
      <WrapperAuth onRegister={PostRegister} name="register" />
    </main>
  )
}

