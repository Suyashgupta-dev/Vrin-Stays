import { Link } from "react-router-dom";
import "tailwindcss";
function Navbar() {
  return (
    <nav className="bg-slate-900 text-white p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="text-xl font-bold tracking-wide text-amber-500 flex-shrink-0">
          VRIN<span className="text-white">STAYS</span>
        </div>

        <div className="flex items-center gap-8">
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
            <li className="hover:text-amber-400 transition-colors duration-200">
              <Link to="/Detials">Hotels Details</Link>
            </li>
            <li className="hover:text-amber-400 transition-colors duration-200">
              <Link to="/Whishlist">Whishlist</Link>
            </li>
            <li className="hover:text-amber-400 transition-colors duration-200">
              <Link to="/Confirmation">Confirmation</Link>
            </li>
            <li className="hover:text-amber-400 transition-colors duration-200">
              <Link to="/Authentication">Sign IN</Link>
            </li>
            <li className="hover:text-amber-400 transition-colors duration-200">
              <Link to="/PaymentGateway">Payment Gateway</Link>
            </li>
            <li className="hover:text-amber-400 transition-colors duration-200">
              <Link to="/Contact">Contact Us</Link>
            </li>
            <li className="hover:text-amber-400 transition-colors duration-200">
              <Link to="/OurTeam">OurTeam</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
