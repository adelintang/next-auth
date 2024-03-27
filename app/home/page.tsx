import HeaderHome from "../components/HeaderHome"

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <HeaderHome />
      <main className="w-full">
        <p className="text-xl text-center mt-6">Welcome to Dashboard</p>
      </main>
    </div>
  )
}

export default HomePage
