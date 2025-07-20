import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const linkClasses = ({ isActive }) =>
    isActive
      ? 'text-green-200 underline font-semibold transition'
      : 'hover:underline hover:text-green-200 transition';

  return (
    <nav className="bg-green-700 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <NavLink to="/" className="text-2xl font-bold hover:text-green-200 transition">
          PestTracker
        </NavLink>
        <div className="space-x-8 text-lg">
          <NavLink to="/" className={linkClasses}>
            Home
          </NavLink>
          <NavLink to="/dashboard" className={linkClasses}>
            Dashboard
          </NavLink>
          <NavLink to="/about" className={linkClasses}>
            About
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
