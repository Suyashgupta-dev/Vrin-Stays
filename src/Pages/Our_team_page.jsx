
import myPhoto from "./myPoto.png";
export default function OurTeamPage() {
    const teamMembers = [
        {
            name: "Suyash Gupta",
            role: "Full Stack Developer",
            image: myPhoto,
            bio: "Passionate about building seamless hospitality and stay solutions."
        },
    ];

    return (
        <div className="bg-gray-50 min-h-screen py-16 px-6">
           
            <div className="max-w-4xl mx-auto text-center mb-12">
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight sm:text-4xl">Meet Our Team</h1>
                <p className="mt-3 text-lg text-gray-600">
                    The talented minds behind Vrin Stays making hotel bookings effortless for you.
                </p>
            </div>

            
            <div className="max-w-md mx-auto flex justify-center items-center">
                {teamMembers.map((member, index) => (
                    <div 
                        key={index} 
                        className="w-full bg-white border border-gray-200 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow text-center"
                    >
                        <img 
                            src={member.image} 
                            alt={member.name} 
                            className="w-28 h-28 rounded-full mx-auto object-cover border-2 border-emerald-500 shadow-sm mb-4"
                        />
                        <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                        <p className="text-sm font-semibold text-emerald-600 mb-3">{member.role}</p>
                        <p className="text-sm text-gray-500 leading-relaxed">{member.bio}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}