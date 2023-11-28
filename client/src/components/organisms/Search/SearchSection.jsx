import SearchInput from "@/components/organisms/Search/SearchInput.jsx";
import { useState } from "react";

export default function SearchSection({ city }) {
  const [searchedValue, setSearchedValue] = useState(city);

  return (
    <SearchInput
      value={searchedValue}
      onChange={(e) => setSearchedValue(e.target.value)}
    />
  );
}
