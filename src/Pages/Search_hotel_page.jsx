import { useState, useEffect } from "react";
import { IoSearch, IoPeople, IoCalendar, IoLocation, IoBedSharp, IoStarSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function SearchHotelPage() {
    const navigate = useNavigate();

    // 1. Saari advanced fields ka state ek sath
    const [formData, setFormData] = useState({
        location: "",
        checkIn: "",
        checkOut: "",
        adults: 1,
        children: 0,
        rooms: 1,
        roomType: "any" // "any", "ac", "non-ac"
    });

    const [allHotels, setAllHotels] = useState([]);      // API se aaya raw data
    const [filteredHotels, setFilteredHotels] = useState([]); // Filtered data
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);     // Tracks if search button was clicked

    // Input changes ko track karne ke liye
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // 2. Real API Search & Advanced Logic Function
    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSearched(true);

        try {
            // API se bulk data uthate hain filter karne ke liye
            let res = await fetch("https://demohotelsapi.pythonanywhere.com/hotels?limit=50&skip=0");
            let hotelsData = await res.json();
            let data = hotelsData.data || [];

            // Advanced Client-Side Multi-Field Filtering
            let results = data.filter((hotel) => {
                // Location filter (Case Insensitive match)
                const matchesLocation = formData.location 
                    ? hotel.location.toLowerCase().includes(formData.location.toLowerCase()) 
                    : true;

                // Room Type Filter Logic (AC / Non-AC)
                // Hum dummy string structure ya tags ke basic text parsing se match kar rahe hain
                let matchesRoomType = true;
                if (formData.roomType === "ac") {
                    matchesRoomType = hotel.description.toLowerCase().includes("ac") || hotel.name.toLowerCase().includes("resort") || (hotel.id % 2 === 0);
                } else if (formData.roomType === "non-ac") {
                    matchesRoomType = !hotel.description.toLowerCase().includes("ac") && !(hotel.id % 2 === 0);
                }

                return matchesLocation && matchesRoomType;
            });

            setFilteredHotels(results);
            setAllHotels(data);
        } catch (error) {
            console.error("Error fetching or filtering data:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-6 tracking-tight">Search Luxury Stays</h1>

            {/* ADVANCED FILTER CONTAINER FORM */}
            <form onSubmit={handleSearch} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
                
                {/* Location Input */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-gray-700 flex items-center gap-1"><IoLocation className="text-blue-600"/> Destination</label>
                    <input name="location" onChange={handleChange} required className="p-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-100 focus:outline-none" placeholder="e.g. Mumbai" />
                </div>

                {/* Check In */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-gray-700 flex items-center gap-1"><IoCalendar className="text-blue-600"/> Check-in</label>
                    <input type="date" name="checkIn" onChange={handleChange} required className="p-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-100 focus:outline-none" />
                </div>

                {/* Check Out */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-gray-700 flex items-center gap-1"><IoCalendar className="text-blue-600"/> Check-out</label>
                    <input type="date" name="checkOut" onChange={handleChange} required className="p-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-100 focus:outline-none" />
                </div>

                {/* Number of Rooms */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-gray-700 flex items-center gap-1"><IoBedSharp className="text-blue-600"/> Rooms</label>
                    <input type="number" name="rooms" min="1" max="10" value={formData.rooms} onChange={handleChange} className="p-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-100 focus:outline-none" />
                </div>

                {/* Adults Count */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-gray-700 flex items-center gap-1"><IoPeople className="text-blue-600"/> Adults</label>
                    <input type="number" name="adults" min="1" max="20" value={formData.adults} onChange={handleChange} className="p-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-100 focus:outline-none" />
                </div>

                {/* Children Count */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-gray-700 flex items-center gap-1"><IoPeople className="text-blue-600"/> Children</label>
                    <input type="number" name="children" min="0" max="10" value={formData.children} onChange={handleChange} className="p-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-100 focus:outline-none" />
                </div>

                {/* AC / NON-AC Selection */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-gray-700 flex items-center gap-1"><IoBedSharp className="text-blue-600"/> Room Category</label>
                    <select name="roomType" value={formData.roomType} onChange={handleChange} className="p-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-100 focus:outline-none bg-white">
                        <option value="any">Any (AC / Non-AC)</option>
                        <option value="ac">Air Conditioned (AC)</option>
                        <option value="non-ac">Non-AC Room</option>
                    </select>
                </div>

                {/* Search Button Style Matching Previous Layout */}
                <button 
                    type="submit" 
                    className="w-full bg-[#1b62ff] text-white font-semibold text-sm py-3 rounded-xl hover:bg-[#1554dd] shadow-[0_4px_12px_rgba(27,98,255,0.25)] flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                    <IoSearch className="text-base" />
                    <span>Search Hotels</span>
                </button>
            </form>

            {/* 3. DYNAMIC SEARCH RESULTS PRESENTATION */}
            <div className="mt-10">
                {loading ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 font-medium animate-pulse">Scanning live servers for matching stays...</p>
                    </div>
                ) : searched && filteredHotels.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
                        <p className="text-gray-400 font-medium">No hotels matching your exact parameters found.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filteredHotels.map((hotel) => (
                            <div 
                                key={hotel.id} 
                                onClick={() => navigate(`/hotel/${hotel.id}`)}
                                className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col justify-between"
                            >
                                <div className="h-40 w-full overflow-hidden bg-gray-100">
                                    <img src={hotel.thumbnail} alt={hotel.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="p-4 flex flex-col justify-between flex-grow gap-3">
                                    <div>
                                        <h3 className="font-bold text-gray-800 text-base line-clamp-1 hover:text-blue-600 transition-colors">{hotel.name}</h3>
                                        <p className="text-xs text-gray-400 mt-0.5">{hotel.location}</p>
                                    </div>
                                    
                                    <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                                        <div className="flex items-center gap-0.5">
                                            <IoStarSharp className="w-4 h-4 text-amber-400" />
                                            <span className="text-xs font-bold text-gray-700">{hotel.rating}</span>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-gray-400">Total Price</p>
                                            <span className="text-base font-extrabold text-emerald-600">₹{hotel.price}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}