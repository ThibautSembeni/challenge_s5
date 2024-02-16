import SearchInput from "@/components/organisms/Search/SearchInput.jsx";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchSection({ city }) {
    const navigate = useNavigate();
    const [searchedValue, setSearchedValue] = useState(city);
    const handleSubmit = (event) => {
        event.preventDefault();
        navigate(`/search?city=${searchedValue}`);
    };
    return (
        <form
            className="flex flex-1 items-center justify-center px-2 lg:ml-6 w-full"
            onSubmit={handleSubmit}
        >
            <SearchInput
                value={searchedValue}
                onChange={(e) => setSearchedValue(e.target.value)}
            />
        </form>
    );
}
