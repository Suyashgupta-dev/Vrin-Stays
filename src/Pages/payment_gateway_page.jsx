import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function PaymentGatewayPage() {
    const navigate = useNavigate();
    
    
    const hotel = useSelector((state) => state.booking.hotelDetails);
    const details = useSelector((state) => state.booking.bookingDetails);

    if (!hotel) {
        return (
            <div className="text-center py-10">
                <p className="text-red-500 font-medium">No booking session found.</p>
                <button onClick={() => navigate("/")} className="text-blue-600 underline text-sm mt-2">Go back to Home</button>
            </div>
        );
    }

    const totalAmount = Number(hotel.price) * Number(details.rooms);

    return (
        <div className=" p-6 bg-white border border-gray-200 rounded-xl shadow-sm mt-10">
            <h1 className="text-xl font-bold text-gray-800 border-b pb-3 mb-4">Secure Checkout</h1>
            
            
            <div className="bg-slate-50 p-4 rounded-lg space-y-3 text-sm mb-6">
                <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Selected Hotel</p>
                    <p className="font-bold text-slate-800 text-base">{hotel.hotelName}</p>
                </div>
                
                <hr className="border-gray-200" />

                <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-xs text-gray-600">
                    <p><span className="font-semibold text-gray-700">Check-in:</span> {details.checkIn || "Not Selected"}</p>
                    <p><span className="font-semibold text-gray-700">Check-out:</span> {details.checkOut || "Not Selected"}</p>
                    <p><span className="font-semibold text-gray-700">Room Category:</span> {details.roomCategory}</p>
                    <p><span className="font-semibold text-gray-700">Total Rooms:</span> {details.rooms}</p>
                    <p className="col-span-2"><span className="font-semibold text-gray-700">Guests:</span> {details.adults} Adults, {details.children} Children</p>
                </div>

                <div className="border-t border-gray-200 pt-3 mt-2 flex justify-between items-center text-slate-900 font-bold text-base">
                    <span>Total Amount:</span>
                    <span className="text-emerald-600">₹{totalAmount}</span>
                </div>
            </div>

            
            <button 
                onClick={() => alert(`Simulating Secure Payment of ₹${totalAmount} Success!`)}
                className="w-full bg-amber-600  text-white p-2.5 rounded-lg text-sm font-semibold  shadow-sm"
            >
                Pay Now ₹{totalAmount}
            </button>
        </div>
    );
}