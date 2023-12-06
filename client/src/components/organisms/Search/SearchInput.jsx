import { Icon } from "@/components/atoms/Icons/Icon.jsx";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function SearchInput({ value, onChange }) {
  return (
    <div className="w-full max-w-lg">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Icon
            icon={"loupe"}
            className="h-5 w-5 text-black"
            aria-hidden="true"
          />
        </div>
        <input
          id="search"
          name="search"
          placeholder="Entrez votre emplacement ou le nom du vétérinaire"
          className="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
          type="search"
          value={value}
          onChange={onChange}
        />
      </div>
      <button
        type="submit"
        className="bg-white text-blue-500 px-6 py-2 rounded-full mt-4 hover:bg-gray-200 transition duration-300"
      >
        Rechercher
      </button>
    </div>
  );
}
