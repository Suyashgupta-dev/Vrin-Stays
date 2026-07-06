import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveBookingData } from "./store";

export default function ConfirmationPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    
    const savedBooking = useSelector((state) => state.booking.bookingDetails);
    
  
    const hotelName = location.state?.hotelName || "Selected Hotel";
    const price = location.state?.price || "0";

  
    const [formData, setFormData] = useState({
        checkIn: savedBooking?.checkIn || "",
        checkOut: savedBooking?.checkOut || "",
        rooms: savedBooking?.rooms || 1,
        adults: savedBooking?.adults || 1,
        children: savedBooking?.children || 0,
        roomCategory: savedBooking?.roomCategory || "Standard",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        
        dispatch(saveBookingData({
            hotelDetails: { hotelName, price },
            bookingDetails: formData
        }));

        navigate("/payment");
    };

    return (
        <div className=" p-6 bg-white border border-gray-200 rounded-xl shadow-sm mt-10">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Confirm Your Booking</h1>
            <p className="text-sm text-gray-500 mb-6">Hotel: <span className="font-semibold text-slate-800">{hotelName}</span> (₹{price}/night)</p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">Check-in Date</label>
                        <input required type="date" name="checkIn" value={formData.checkIn} onChange={handleChange} className="w-full p-2 border rounded-md text-sm bg-gray-50 focus:bg-white outline-none focus:border-emerald-500" />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">Check-out Date</label>
                        <input required type="date" name="checkOut" value={formData.checkOut} onChange={handleChange} className="w-full p-2 border rounded-md text-sm bg-gray-50 focus:bg-white outline-none focus:border-emerald-500" />
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">Rooms</label>
                        <input min="1" type="number" name="rooms" value={formData.rooms} onChange={handleChange} className="w-full p-2 border rounded-md text-sm bg-gray-50 focus:bg-white outline-none" />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">Adults</label>
                        <input min="1" type="number" name="adults" value={formData.adults} onChange={handleChange} className="w-full p-2 border rounded-md text-sm bg-gray-50 focus:bg-white outline-none" />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">Children</label>
                        <input min="0" type="number" name="children" value={formData.children} onChange={handleChange} className="w-full p-2 border rounded-md text-sm bg-gray-50 focus:bg-white outline-none" />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Room Category</label>
                    <select name="roomCategory" value={formData.roomCategory} onChange={handleChange} className="w-full p-2 border rounded-md text-sm bg-gray-50 focus:bg-white outline-none">
                        <option value="Standard">Standard Room</option>
                        <option value="Deluxe">Deluxe Room</option>
                        <option value="Executive">Executive Suite</option>
                    </select>
                </div>

                <button type="submit" className="w-full mt-4 bg-amber-600 text-white p-2.5 rounded-lg font-medium text-sm hover:bg-emerald-700 transition-colors shadow-sm">
                    Proceed to Payment &rarr;
                </button>
            </form>
        </div>
    );
}