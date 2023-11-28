import { useParams } from "react-router-dom";
import Navbar from "@/components/molecules/Navbar/index.jsx";
import SearchSection from "@/components/organisms/Search/SearchSection.jsx";
import ResultSection from "@/components/organisms/Search/ResultSection.jsx";

export default function SearchResult() {
  const { city } = useParams();

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
