import { Outlet, useNavigate } from "react-router-dom";

export default function Contact() {
    let navigate = useNavigate(); 

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start pt-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
                
             
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        Contact Details
                    </h1>
                    <p className="mt-2 text-sm text-gray-500">
                        Choose your preferred platform to get in touch with us.
                    </p>
                </div>

                <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3 justify-center">
                    <button 
                        onClick={() => navigate("tp")}
                        className="w-full sm:w-auto px-5 py-2.5 text-sm font-medium text-white bg-sky-500 hover:bg-sky-600 active:bg-sky-700 rounded-xl transition-all duration-200 shadow-sm shadow-sky-100"
                    >
                        Via Telegram
                    </button>
                    
                    <button 
                        onClick={() => navigate("ig")}
                        className="w-full sm:w-auto px-5 py-2.5 text-sm font-medium text-white bg-sky-500 from-yellow-500 via-red-500 to-purple-600 hover:opacity-90 active:scale-98 rounded-xl transition-all duration-200 shadow-sm"
                    >
                        Via Instagram
                    </button>
                    
                    <button 
                        onClick={() => navigate("fb")}
                        className="w-full sm:w-auto px-5 py-2.5 text-sm font-medium text-white bg-sky-500 hover:bg-blue-700 active:bg-blue-800 rounded-xl transition-all duration-200 shadow-sm shadow-blue-100"
                    >
                        Via Facebook
                    </button>
                </div>

             
                <div className="mt-8 pt-6 border-t border-gray-100 text-left">
                    <Outlet />
                </div>
                
            </div>
        </div>
    );
}