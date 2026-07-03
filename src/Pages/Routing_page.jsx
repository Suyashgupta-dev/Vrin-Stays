import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar_page';
import HomePage from './Home_page';
import Hotellist from './Hotel_list_page';
import SearchHotelPage from './Search_hotel_page';
import HotelDetailPage from './Hotel_detail_page';
import Whishlist from './Whishlist_page';
import ConfirmationPage from './confirmation_page';
import AuthenticationPage from './authentication_page';
import PaymentGatewayPage from './payment_gateway_page';
import Contact from './Contact_us_page';
import OurTeamPage from './Our_team_page';

function Routing() {
  return (
    <Router>
      <Navbar/>
   
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Hotellist" element={<Hotellist />} />
        <Route path="/Search" element={<SearchHotelPage/>} />
        <Route path="/Detials" element={<HotelDetailPage/>} />
        <Route path="/Whishlist" element={<Whishlist/>} />
        <Route path="/Conmfirmation" element={<ConfirmationPage/>} />
        <Route path="/Authentication" element={<AuthenticationPage/>} />
        <Route path="/PaymentGateway" element={<PaymentGatewayPage/>} />
        <Route path="/Contact" element={<Contact/>} />
        <Route path="/OurTeam" element={<OurTeamPage/>} />
      </Routes>
    </Router>
  );
}

export default Routing;