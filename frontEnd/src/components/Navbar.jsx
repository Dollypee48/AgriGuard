import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="bg-green-700 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold hover:text-green-200 transition">
          PestTracker
        </Link>
        <div className="space-x-6">
          <Link to="/" className="hover:underline hover:text-green-200 transition">
            Home
          </Link>
          <Link to="/dashboard" className="hover:underline hover:text-green-200 transition">
            Dashboard
          </Link>
        </div>
      </div>
    </nav>
  )
}