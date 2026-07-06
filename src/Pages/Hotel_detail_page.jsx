import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoStarSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { addToWishlist } from "./store";




export default function HotelDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [hotel, setHotel] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchHotelDetail() {
            try {
                let res = await fetch(`https://demohotelsapi.pythonanywhere.com/hotels/${id}`);
                let hotelData = await res.json();
                setHotel(hotelData);
            } catch (error) {
                console.error("Error fetching hotel detail:", error);
            } finally {
                setLoading(false);
            }
        }
        if (id) fetchHotelDetail();
    }, [id]);
    console.log(hotel)

    const handleAddToWishlist = () => {
        if (hotel && hotel.data) {
            dispatch(addToWishlist(hotel.data));
            alert(`${hotel.data.name} added to wishlist!`);
            navigate("/Wishlist");
        }
    };
    const handleConfirmBooking = () => {
        if (hotel && hotel.data) {
            const isConfirmed = window.confirm(`Are you sure you want to confirm your booking for ${hotel.data.name}?`);
            if (isConfirmed) {
                // Aap chahein to yahan context/redux me booking state save kar sakte hain
                navigate("/confirmation", { state: { hotelName: hotel.data.name, price: hotel.data.price } });
            }
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <p className="text-gray-500 font-medium animate-pulse">Loading hotel details...</p>
            </div>
        );
    }

    if (!hotel) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <div className="text-center">
                    <p className="text-red-500 font-medium mb-4">Hotel details not found.</p>
                    <button onClick={() => navigate("/")} className="text-sm text-blue-600 hover:underline">
                        Go back to Home
                    </button>
                </div>
            </div>
        );
    }


    return (
        <div className="max-w-4xl mx-auto p-6 bg-white border border-gray-200 rounded-xl shadow-sm mt-10">
            <button
                onClick={() => navigate(-1)}
                className="text-sm text-blue-600 hover:underline mb-4 inline-block font-medium"
            >
                &larr; Back
            </button>

            <img
                src={hotel.data.thumbnail}
                alt={hotel.data.name}
                className="w-full h-[300px] object-cover rounded-xl bg-gray-100 shadow-sm"
            />

            <div className="mt-6">
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{hotel.data.name}</h1>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-600 mt-3 border-y border-gray-100 py-3">
                    <p><span className="font-semibold text-gray-800">Location:</span> {hotel.data.location}</p>
                    <div className="flex items-center gap-1">
                        <span className="font-semibold text-gray-800">Rating:</span>
                        <div className="flex items-center">
                            <LocalStarRating rating={hotel.data.rating} />
                        </div>
                    </div>
                    <p><span className="font-semibold text-gray-800">Price:</span> <span className="text-emerald-600 font-bold text-lg">₹{hotel.data.price}</span></p>
                </div>

                <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-800">About this hotel</h3>
                    <p className="text-gray-600 mt-2 leading-relaxed whitespace-pre-line">{hotel.data.description}</p>
                </div>
                <div className="mt-8 pt-4 border-t border-gray-100 flex justify-end gap-3">
                    <button 
                        onClick={handleAddToWishlist}
                        className="px-4 py-2 text-sm font-medium text-slate-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Save to Wishlist
                    </button>
                    <button 
                        onClick={handleConfirmBooking}
                        className="px-5 py-2 text-sm font-medium text-white bg-emerald-600 border border-transparent rounded-lg hover:bg-emerald-700 shadow-sm transition-colors"
                    >
                        Confirm Booking &rarr;
                    </button>
                </div>
            </div>
        </div>
    );
}


function LocalStarRating({ rating }) {
    let stars = [];
    let roundedRating = Math.ceil(rating || 0);
    for (let i = 1; i <= 5; i++) {
        stars.push(
            <IoStarSharp
                key={i}
                className={`w-4 h-4 ${i <= roundedRating ? "text-amber-400" : "text-gray-200"}`}
            />
        );
    }
    return <div className="flex gap-0.5">{stars}</div>;
}
