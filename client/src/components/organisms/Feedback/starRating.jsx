import { StarIcon } from "@heroicons/react/20/solid";
function StarRating({ rating, handleSetRating }) {
    return (
        <div className={"flex items-center"}>
            {[1, 2, 3, 4, 5].map((starNumber) => (
                <StarIcon
                    key={starNumber}
                    className={`h-5 w-5 flex-shrink-0 ${
                        starNumber <= rating
                            ? "text-yellow-400"
                            : "text-gray-200"
                    }`}
                    onClick={() => handleSetRating(starNumber)}
                />
            ))}
        </div>
    );
}

export default StarRating;
