import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import Dashboard from './pages/Dashboard'
import PestDetails from './pages/PestDetails'

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="pb-12">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/pest/:id" element={<PestDetails />} />
          </Routes>
        </main>
        <footer className="bg-green-700 text-white py-6">
          <div className="container mx-auto px-4 text-center">
            <p>PestTracker © {new Date().getFullYear()} - GBIF Data Integration</p>
          </div>
        </footer>
      </div>
    </Router>
  )
}