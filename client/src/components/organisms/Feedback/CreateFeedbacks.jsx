import { createFeedback } from "@/api/feedbacks";
import { useState } from "react";
import StarRating from "@/components/organisms/Feedback/starRating";

export default function CreateFeedbacks(props) {
    const [rating, setRating] = useState(0);

    const handleSetRating = (rate) => {
        setRating(rate);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const comment = formData.get("comment");
        const data = {
            rating,
            comment,
            appointment: `/api/appointments/${props.appointment}`,
            verify: false,
        };
        createFeedback(data);
        form.reset();
    };

    return (
        <div className="flex items-start space-x-4 mb-4">
            <div className="min-w-0 flex-1">
                <form
                    action="POST"
                    className="relative"
                    onSubmit={handleSubmit}
                >
                    <div className="overflow-hidden rounded-lg shadow-md ring-1 ring-inset ring-gray-400 focus-within:ring-2 focus-within:ring-blue-500 transition duration-150 ease-in-out">
                        <label htmlFor="comment" className="sr-only">
                            Ajoute ton commentaire...
                        </label>
                        <textarea
                            rows={3}
                            name="comment"
                            id="comment"
                            className="block w-full resize-none border-0 bg-gray-50 py-2 px-3 text-gray-900 placeholder:text-gray-500 focus:ring-0 sm:text-sm sm:leading-6 transition duration-150 ease-in-out"
                            placeholder="Ajoute ton commentaire..."
                            defaultValue={""}
                            minLength={5}
                            maxLength={255}
                            required
                        />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 flex justify-between py-2 px-3">
                        <StarRating
                            rating={rating}
                            handleSetRating={handleSetRating}
                        />
                        <div className="flex-shrink-0">
                            <button
                                type="submit"
                                className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition duration-150 ease-in-out"
                            >
                                Publier
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
