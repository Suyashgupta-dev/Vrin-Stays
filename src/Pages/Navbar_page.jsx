import { Link } from 'react-router-dom';
import "tailwindcss";
function Navbar() {
  return (
    <nav>
      <ul style={{ listStyle: 'none', display: 'flex', gap: '15px', padding: 0 }}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/Hotellist">Hotel list</Link>
        </li>
        <li>
          <Link to="/Search">Search Hotels</Link>
        </li>
        <li>
          <Link to="/Detials">Hotels Details</Link>
        </li>
        <li>
          <Link to="/Whishlist">Whishlist</Link>
        </li>
        <li>
          <Link to="/Confirmation">Confirmation</Link>
        </li>
        <li>
          <Link to="/Authentication">Sign IN</Link>
        </li>
        <li>
          <Link to="/PaymentGateway">PaymentGateway</Link>
        </li>
        <li>
          <Link to="/Contact">Contact Us</Link>
        </li>
        <li>
          <Link to="/OurTeam">OurTeam</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;