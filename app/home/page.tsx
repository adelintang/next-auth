const HomePage = () => {
  return (
    <div className="min-h-screen">
      <header className="bg-[#14213D] flex items-center justify-between p-3">
        <h1 className="text-white">Username</h1>
        <button className="text-white bg-red-600 hover:bg-red-700 py-1 px-2 rounded">Logout</button>
      </header>
      <main className="w-full">
        <p className="text-xl text-center mt-6">Welcome to Dashboard</p>
      </main>
    </div>
  )
}

export default HomePage
