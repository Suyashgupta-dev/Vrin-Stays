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

            <div className="flex gap-2 mt-5 items-center">
                <button
                    onClick={() => setCurrent((prev) => Math.max(0, prev - 1))}
                    disabled={current === 0}
                >
                    Previous
                </button>

                {generatePagination().map((el, index) =>
                    el === "..." ? (
                        <span key={index}>...</span>
                    ) : (
                        <button
                            key={index}
                            onClick={() => setCurrent(el)}
                            className={current === el ? "font-bold" : "font-normal"}
                        >
                            {el + 1}
                        </button>
                    )
                )}

                <button
                    onClick={() => setCurrent((prev) => Math.min(no_of_pages - 1, prev + 1))}
                    disabled={current === no_of_pages - 1}
                >
                    Next
                </button>
            </div>
        </>
    );
}

export function Product({ name, thumbnail, des, location, rating, price }) {
    return (
        <div className="flex gap-5">
            <div>
                <img width="200px" src={thumbnail} alt="hotel" />
            </div>
            <div>
                <h2>{name}</h2>
                <p>{des.slice(0, 200)}...</p>
                <p>Location: {location}</p>
                <p className="flex items-center gap-1">
                    Rating: <StarRating rating={rating} />
                </p>
                <p>Price: {price}</p>
                <button>Move to WishList</button>
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
