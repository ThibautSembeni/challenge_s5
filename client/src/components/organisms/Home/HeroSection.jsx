import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchInput from "@/components/organisms/Search/SearchInput.jsx";

export default function HeroSection() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/search/${searchValue}`);
  };

  return (
    <div className="bg-blue-500 text-white h-60 flex items-center justify-center">
      <div className="text-center w-full">
        <h1 className="text-3xl font-bold mb-4">Trouvez un vétérinaire</h1>
        <p className="text-md mb-6">
          Trouvez les vétérinaires proches de chez vous.
        </p>
        <form
          className="flex flex-1 items-center justify-center px-2 lg:ml-6 w-full"
          onSubmit={handleSubmit}
        >
          <SearchInput
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </form>
      </div>
    </div>
  );
}
