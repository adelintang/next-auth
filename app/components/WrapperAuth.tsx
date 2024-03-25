interface WrapperAuthProps {
  name: 'login' | 'register'
}

export default function WrapperAuth({ name }: WrapperAuthProps) {
  return (
    <form className="m-auto w-[90%] mx-auto rounded p-4">
      <h1 className="text-xl font-semibold text-blue-600 text-center">{name.at(0)?.toUpperCase() + name.slice(1)} Page</h1>
      <div className="flex flex-col mt-8 gap-y-3">
        <input
          type="email"
          name="email"
          id="email"
          placeholder="enter your email"
          autoComplete="off"
          className="w-full rounded p-2 outline-none border-2 border-solid border-blue-400 focus:ring-2 focus:ring-blue-600"
        />
        {
          name === 'register' && (
            <input
              type="text"
              name="username"
              id="username"
              placeholder="enter your username"
              autoComplete="off"
              className="w-full rounded p-2 outline-none border-2 border-solid border-blue-400 focus:ring-2 focus:ring-blue-600"
            />
          )
        }
        <input
          type="password"
          name="password"
          id="password"
          placeholder="enter your password"
          className="w-full rounded p-2 outline-none border-2 border-solid border-blue-400 focus:ring-2 focus:ring-blue-600"
        />
      </div>
      <button
        type="submit"
        className="mt-6 w-full text-white text-center bg-blue-600 hover:bg-blue-700 rounded py-1.5 text-lg"
      >
        {name.at(0)?.toUpperCase() + name.slice(1)}
      </button>
    </form>
  )
}
