import  { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthenticationPage() {
    const navigate = useNavigate();
    const [isSignIn, setIsSignIn] = useState(true); 
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (isSignIn) {
            
            alert(`Logged in successfully with email: ${formData.email}`);
            navigate("/");
        } else {
            
            if (formData.password !== formData.confirmPassword) {
                alert("Passwords do not match!");
                return;
            }
            alert(`Account created successfully for ${formData.name}! Now please Sign In.`);
            setIsSignIn(true); 
        }
    };

    return (
        <div className="flex justify-center items-center  bg-gray-50 px-4 py-10">
            <div className=" w-full bg-white border border-gray-200 p-8 rounded-xl shadow-sm">
                
                
                <div className="text-center ">
                    <h2 className="text-2xl font-bold text-gray-900">
                        {isSignIn ? "Sign In to Vrin Stays" : "Create Your Account"}
                    </h2>
                    <p className="text-sm text-gray-500 ">
                        {isSignIn ? "Welcome back! Please enter your details." : "Join us to "}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    
                    {!isSignIn && (
                        <div>
                            <label className="block text-xs font-semibold text-gray-600 mb-1">Full Name</label>
                            <input 
                                required 
                                type="text" 
                                name="name" 
                                value={formData.name} 
                                onChange={handleChange} 
                                className="w-full p-2.5 border rounded-lg text-sm bg-gray-50 focus:bg-white outline-none focus:border-emerald-500 " 
                            />
                        </div>
                    )}

                    
                    <div>
                        <label className="block text-xs font-semibold text-gray-600 ">Email Address</label>
                        <input 
                            required 
                            type="email" 
                            name="email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            className="w-full p-2.5 border rounded-lg text-sm bg-gray-50 focus:bg-white outline-none focus:border-emerald-500" 
                        />
                    </div>

                    
                    <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">Password</label>
                        <input 
                            required 
                            type="password" 
                            name="password" 
                            value={formData.password} 
                            onChange={handleChange} 
                            placeholder="••••••••"
                            className="w-full p-2.5 border rounded-lg text-sm bg-gray-50 focus:bg-white outline-none focus:border-emerald-500 " 
                        />
                    </div>

                    
                    {!isSignIn && (
                        <div>
                            <label className="block text-xs font-semibold text-gray-600 mb-1">Confirm Password</label>
                            <input 
                                required 
                                type="password" 
                                name="confirmPassword" 
                                value={formData.confirmPassword} 
                                onChange={handleChange} 
                                className="w-full p-2.5 border rounded-lg text-sm bg-gray-50 focus:bg-white outline-none focus:border-emerald-500 " 
                            />
                        </div>
                    )}

                    
                    <button type="submit" className="w-full bg-amber-600 text-white p-2.5 rounded-lg font-medium text-sm   shadow-sm mt-2">
                        {isSignIn ? "Sign In" : "Sign Up"}
                    </button>
                </form>

                
                <div className="text-center mt-6 pt-4 border-t border-gray-100 text-sm">
                    <p className="text-amber-600">
                        {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
                        <button 
                            type="button"
                            onClick={() => {
                                setIsSignIn(!isSignIn);
                                setFormData({ name: "", email: "", password: "", confirmPassword: "" }); // Reset form inputs
                            }}
                            className="text-emerald-600 font-semibold hover:underline"
                        >
                            {isSignIn ? "Sign Up" : "Sign In"}
                        </button>
                    </p>
                </div>

            </div>
        </div>
    );
}