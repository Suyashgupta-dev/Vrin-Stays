import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoSearchOutline,IoStarSharp } from "react-icons/io5";

export default function HomePage() {
    const navigate = useNavigate();
    
    
    const [luxuryHotels, setLuxuryHotels] = useState([]);
    const [budgetHotels, setBudgetHotels] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchSpecialtyHotels() {
            try {
                
                let res = await fetch(`https://demohotelsapi.pythonanywhere.com/hotels?limit=50&skip=0`);
                let hotelsData = await res.json();
                let allHotels = hotelsData.data || [];

                
                let luxury = allHotels
                    .filter(hotel => parseFloat(hotel.rating) >= 4.0)
                    .slice(0, 5);

                
                let budget = [...allHotels]
                    .sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
                    .slice(0, 5);

                setLuxuryHotels(luxury);
                setBudgetHotels(budget);
            } catch (error) {
                console.error("Error fetching specialty hotels:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchSpecialtyHotels();
    }, []);

    const handleRedirect = () => {
        navigate("/Search");
    };

    return (
        <div className="bg-white min-h-screen">
            
            <div 
                className="relative bg-cover bg-center h-[520px] flex items-center justify-center px-4"
                style={{ 
                    backgroundImage: " url('https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1600&q=80')" 
                }}
            >
                <div className="max-w-4xl w-full text-center  z-10">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-amber-500 tracking-tight drop-shadow-md">
                        VRIN<span className="text-white">STAYS</span>
                    </h1>
                    <p className="mt-4 text-lg md:text-xl text-gray-100 font-medium max-w-2xl mx-auto drop-shadow-sm">
                        Discover low prices on hotels, luxury resorts, cozy homestays, and much more...
                    </p>

                    
                    <div className="mt-10 flex justify-center">
                        <button 
                            onClick={handleRedirect}
                            className="bg-[#1b62ff] text-white font-semibold text-lg px-50 py-4 rounded-full hover:bg-[#1554dd] shadow-[0_8px_20px_rgba(27,98,255,0.4)] 
                            transition-all flex items-center justify-center gap-3 whitespace-nowrap active:scale-95"
                        >
                            <IoSearchOutline className="text-2xl stroke-[3px]" />
                            <span>Search Hotels</span>
                        </button>
                    </div>
                </div>
            </div>

            
            <div className="max-w-6xl mx-auto px-6 py-16">
                {loading ? (
                    <div className="text-center py-10">
                        <p className="text-gray-500 font-medium animate-pulse">Curating special stays for you...</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-16">
                        
                        <div>
                            <div className="mb-6">
                                <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Top Rated Luxury Stays</h2>
                                <p className="text-gray-500 mt-1 text-sm">Handpicked properties with elite ratings and superior comfort.</p>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                {luxuryHotels.map((hotel) => (
                                    <MiniHotelCard key={hotel.id} hotel={hotel} navigate={navigate} />
                                ))}
                            </div>
                        </div>

                        <div>
                            <div className="mb-6">
                                <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Best Budget Deals</h2>
                                <p className="text-gray-500 mt-1 text-sm">Highly economical stays that offer the absolute best value for money.</p>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                {budgetHotels.map((hotel) => (
                                    <MiniHotelCard key={hotel.id} hotel={hotel} navigate={navigate} />
                                ))}
                            </div>
                        </div>

                    </div>
                )}
            </div>

            

            
            <footer className="bg-slate-900 text-gray-400 py-10 px-6 text-center text-sm">
                <p>&copy; 2026 BlissLuxeon Hotels Platform. All rights reserved.</p>
            </footer>
        </div>
    );
}

function MiniHotelCard({ hotel, navigate }) {
    return (
        <div 
            onClick={() => navigate(`/hotel/${hotel.id}`)}
            className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col justify-between"
        >
            <div className="h-36 w-full overflow-hidden bg-gray-100">
                <img 
                    src={hotel.thumbnail} 
                    alt={hotel.name} 
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="p-3 flex flex-col justify-between flex-grow gap-2">
                <div>
                    <h3 className="font-bold text-gray-800 text-sm line-clamp-1 hover:text-blue-600 transition-colors">
                        {hotel.name}
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">{hotel.location}</p>
                </div>
                
                <div className="flex items-center justify-between mt-1 pt-2 border-t border-gray-50">
                    <div className="flex items-center gap-0.5">
                        <IoStarSharp className="w-3.5 h-3.5 text-amber-400" />
                        <span className="text-xs font-bold text-gray-700">{hotel.rating}</span>
                    </div>
                    <span className="text-sm font-extrabold text-emerald-600">₹{hotel.price}</span>
                </div>
            </div>
        </div>
    );
}