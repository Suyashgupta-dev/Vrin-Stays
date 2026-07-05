import { Link } from "react-router-dom";
import { useState } from 'react';
import "tailwindcss";
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="bg-slate-900 text-white p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="text-xl font-bold tracking-wide text-amber-500 flex-shrink-0">
          VRIN<span className="text-white">STAYS</span>
        </div>

        <div className="flex items-center gap-8">
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <ul className="hidden md:flex items-center gap-6 list-none m-0 p-0 text-sm font-medium">
              <li className="hover:text-amber-400 transition-colors duration-200">
                <Link to="/">Home</Link>
              </li>
              <li className="hover:text-amber-400 transition-colors duration-200">
                <Link to="/Hotellist">Hotel list</Link>
              </li>
              <li className="hover:text-amber-400 transition-colors duration-200">
                <Link to="/Search">Search Hotels</Link>
              </li>
            </ul>
          </div>

          <div className="flex items-center gap-3">
            <ul><li className="bg-amber-500 hover:bg-amber-600 text-slate-900 px-4 py-2 rounded-full text-sm font-bold transition-all">
              <Link to="/Authentication">Sign IN</Link>
            </li></ul>

          </div>
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-1 hover:text-amber-400 transition-colors"
            >
              ▾
            </button>
            {isOpen && (
              <div className="absolute right-0 mt-3 w-48 bg-slate-800 rounded-lg shadow-xl border border-slate-700 py-2 z-50">
                <ul>
                  <li className="block px-4 py-2 hover:bg-slate-700 hover:text-amber-400">
                    <Link to="/Detials">Hotels Details</Link>
                  </li>
                  <li className="block px-4 py-2 hover:bg-slate-700 hover:text-amber-4000">
                    <Link to="/Whishlist">Whishlist</Link>
                  </li>
                  <li className="block px-4 py-2 hover:bg-slate-700 hover:text-amber-400">
                    <Link to="/Confirmation">Confirmation</Link>
                  </li>
                  <li className="block px-4 py-2 hover:bg-slate-700 hover:text-amber-400">
                    <Link to="/PaymentGateway">Payment Gateway</Link>
                  </li>
                  <li className="block px-4 py-2 hover:bg-slate-700 hover:text-amber-400">
                    <Link to="/Contact">Contact Us</Link>
                  </li>
                  <li className="block px-4 py-2 hover:bg-slate-700 hover:text-amber-400">
                    <Link to="/OurTeam">OurTeam</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

      </div>
    </nav >
  );
}

export default Navbar;
