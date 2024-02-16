import { useMemo } from "react";
import { useParams, useLocation } from "react-router-dom";
import Navbar from "@/components/molecules/Navbar/index.jsx";
import SearchSection from "@/components/organisms/Search/SearchSection.jsx";
import ResultSection from "@/components/organisms/Search/ResultSection.jsx";

function useQuery() {
    const { search } = useLocation();

    return useMemo(() => new URLSearchParams(search), [search]);
}

export default function SearchResult() {
    const query = useQuery();
    const city = query.get("city");
    return (
        <div className={"bg-white"}>
            <Navbar />
            <div
                className={
                    "flex items-center justify-center text-center bg-blue-500 py-6"
                }
            >
                <SearchSection city={city} />
            </div>
            <ResultSection city={city} />
        </div>
    );
}
