import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoTrashOutline, IoStarSharp,IoCheckmarkCircleOutline } from "react-icons/io5";
import { removeFromWishlist } from "./store";

export default function WishlistPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const wishlistItems = useSelector((state) => state.wishlist.items);


    const handleConfirmBooking = (hotel, e) => {
        e.stopPropagation();
        const isConfirmed = window.confirm(`Are you sure you want to confirm your booking for ${hotel.name}?`);
        if (isConfirmed) {

            navigate("/confirmation", { state: { hotelName: hotel.name, price: hotel.price } });
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white min-h-screen">

            <div className="border-b border-gray-200 pb-4 mb-6">
                <h1 className="text-2xl font-bold text-gray-800">My Wishlist</h1>
                <p className="text-gray-500 text-xs mt-1">{wishlistItems.length} hotels saved</p>
            </div>


            {wishlistItems.length === 0 ? (
                <div className="text-center py-12 border border-dashed border-gray-300 rounded-lg">
                    <p className="text-gray-400 text-sm">Your wishlist is empty.</p>
                    <button
                        onClick={() => navigate("/")}
                        className="mt-4 text-sm font-semibold text-blue-600 hover:underline"
                    >
                        Explore Hotels &rarr;
                    </button>
                </div>
            ) : (

                <div className="flex flex-col gap-4">
                    {wishlistItems.map((hotel) => (
                        <div
                            key={hotel.id}
                            onClick={() => navigate(`/hotel/${hotel.id}`)}
                            className="flex flex-col sm:flex-row gap-4 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                        >
                            <div className="w-full sm:w-44 h-28 flex-shrink-0">
                                <img src={hotel.thumbnail} alt={hotel.name} className="w-full h-full object-cover rounded" />
                            </div>

                            <div className="flex flex-col justify-between flex-grow">
                                <div>
                                    <h2 className="text-lg font-bold text-gray-800 hover:text-blue-600">{hotel.name}</h2>
                                    <p className="text-gray-500 text-xs mt-0.5">Location: {hotel.location}</p>
                                    <div className="flex items-center gap-1 text-xs text-gray-600 mt-2">
                                        <IoStarSharp className="text-amber-400" />
                                        <span>{hotel.rating} Rating</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between mt-4 sm:mt-0 pt-2 border-t border-gray-100 sm:border-t-0">
                                    <span className="text-base font-bold text-emerald-600">₹{hotel.price}</span>


                                    <div className="flex items-center justify-between mt-4 pt-2 border-t border-gray-100">
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            dispatch(removeFromWishlist(hotel.id));
                                        }}
                                        className="flex items-center gap-1 text-xs font-medium text-red-500 hover:text-red-700 p-1 transition-colors"
                                    >
                                        <IoTrashOutline className="text-sm" />
                                        <span>Remove</span>
                                    </button>

                                    <button 
                                        onClick={(e) => handleConfirmBooking(hotel, e)}
                                        className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-md shadow-sm transition-colors"
                                    >
                                        <IoCheckmarkCircleOutline className="text-sm" />
                                        <span>Confirm Booking</span>
                                    </button>
                                </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}