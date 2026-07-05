import { useEffect, useState } from "react"
import { IoStarSharp } from "react-icons/io5";


export default function Home() {
    let [current, setCurrent] = useState(0);
    let [totalCount, setTotalCount] = useState(0);
    let PAGE_SIZE = 33;
    let [data, setData] = useState([]);

    useEffect(() => {
        let url = `https://demohotelsapi.pythonanywhere.com/hotels?limit=${PAGE_SIZE}&skip=${PAGE_SIZE * current}`;

        async function dataFetch() {
            try {
                let res = await fetch(url);
                let hotelsData = await res.json();
                setTotalCount(hotelsData.count);
                setData(hotelsData.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        dataFetch();
    }, [current]);

    let no_of_pages = Math.ceil(totalCount / PAGE_SIZE);

    const generatePagination = () => {
        const pages = [];
        if (no_of_pages <= 5) {
            for (let i = 0; i < no_of_pages; i++) {
                pages.push(i);
            }
            return pages;
        }

        pages.push(0);
        let start = Math.max(1, current - 1);
        let end = Math.min(no_of_pages - 2, current + 1);

        if (current <= 1) {
            end = 2;
        } else if (current >= no_of_pages - 2) {
            start = no_of_pages - 3;
        }

        if (start > 1) {
            pages.push("...");
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        if (end < no_of_pages - 2) {
            pages.push("...");
        }

        pages.push(no_of_pages - 1);
        return pages;
    };

    return (
        <>

            <div className="flex flex-col gap-5">
                {data.map((el, index) => (
                    <Product
                        key={index}
                        name={el.name}
                        thumbnail={el.thumbnail}
                        des={el.description}
                        location={el.location}
                        rating={el.rating}
                        price={el.price}
                    />
                ))}
            </div>

            <div className="flex justify-center items-center gap-2 mt-8 py-4 border-t border-gray-200">
                <button
                    onClick={() => setCurrent((prev) => Math.max(0, prev - 1))}
                    disabled={current === 0}
                    className="px-4 py-2 border rounded-md text-sm font-medium bg-white text-gray-700 shadow-sm hover:bg-gray-50
                     disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                
                >
                    Previous
                </button>

                {generatePagination().map((el, index) =>
                    el === "..." ? (
                        <span key={index} className="px-3 py-2 text-gray-400" >...</span>
                    ) : (
                        <button
                            key={index}
                            onClick={() => setCurrent(el)}
                            className={`px-3.5 py-2 text-sm font-medium rounded-md transition-colors ${
                                        current === el
                                            ? "bg-gray-700 text-white shadow-sm"
                                            : "text-gray-700 hover:bg-gray-200"
                                    }`}
                        >
                            {el + 1}
                        </button>
                    )
                )}

                <button
                    onClick={() => setCurrent((prev) => Math.min(no_of_pages - 1, prev + 1))}
                    disabled={current === no_of_pages - 1}
                    className="px-4 py-2 border rounded-md text-sm font-medium bg-white text-gray-700 shadow-sm 
                    hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    Next
                </button>
            </div>
        </>
    );
}

export function Product({ name, thumbnail, des, location, rating, price }) {
    return (
        <div className="flex flex-col sm:flex-row gap-6 p-5 bg-white border border-gray-400 rounded-xl shadow-sm hover:shadow-md transition-shadow" >
            <div className="w-full sm:w-[220px] h-[140px] flex-shrink-0">
                <img src={thumbnail} 
                    alt={name} 
                    className="w-full h-full object-cover rounded-lg bg-gray-100" src={thumbnail} alt="hotel" />
            </div>
            <div className="flex flex-col justify-between flex-grow gap-2">
                
                <div>
                    <h2 className="text-xl font-bold text-gray-800 t">{name}</h2>
                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                        {des ? `${des.slice(0, 180)}...` : "No description available."}
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500 mt-2">
                    <p><span className="font-semibold text-gray-700">Location:</span> {location}</p>
                    <div className="flex items-center gap-1">
                        <span className="font-semibold text-gray-700">Rating:</span>
                        <div className="flex items-center"><StarRating rating={rating} /></div>
                    </div>
                    <p><span className="font-semibold text-gray-700">Price:</span> <span className="text-emerald-600 font-bold">₹{price}</span></p>
                </div>
              <div className="mt-3 sm:mt-0 flex justify-end">
                    <button className="px-4 py-2  font-medium text-slate-900  border border-slate-900  rounded-lg hover:bg-blue-50  focus:ring-blue-100 transition-all">
                        Move to Wishlist
                    </button>
                </div>
            </div>

        </div>
    );
}

function StarRating({ rating }) {
    let stars = [];
    for (let i = 1; i <= Math.ceil(rating); i++) {
        stars.push(<IoStarSharp key={i} color="orange" />);
    }
    return <>{stars}</>;
}
